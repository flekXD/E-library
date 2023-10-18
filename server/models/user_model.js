const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required:true,
        trim : true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim : true,
        validate: {
            validator: function(v) {
                return validator.isEmail(v);
            },
            message:'Error: Email is invalid'
        }
    },
    password: {
        type: String,
        required: true,
        min: [7,'please add some symbols'],
        trim : true,
        bcrypt : true,
        validate: {
            validator: function(v) {

                return !v.toLowerCase().includes('password');
            },
            message: 'Password cannot contain the word "password"'
        }
    },
    tokens : [{
        token:{
            type: String,
            required: true
        }
    }]
}, {toJson : {virtual: true}, toObject: {virtual:true}})


userSchema.pre('save', async function(next) {
    this.email = this.email.toLowerCase();
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

userSchema.virtual('Books', {
    ref: "Books",
    localField : '_id',
    foreignField : 'creator'
})


userSchema.statics.findOneByCredentials = async (email , password) =>{
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Incorrect email');
    }

    const isMatch = await  bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Incorrect password');
    }
    return user;
}
userSchema.methods.generateAuthToken = async function () {

    const user = this;

    const token = jwt.sign({_id : user._id.toString()}, 'secret');

    user.tokens = user.tokens.concat({token});

    await user.save();

    return token;
};
userSchema.methods.toJSON = function (){
    const user = this;
    const userObject = user.toObject();
    delete  userObject.password;
    delete userObject.tokens;
    return userObject;
}
const User = mongoose.model('User', userSchema);

module.exports = User;