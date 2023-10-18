const mongoose = require('mongoose')
const { string } = require('prop-types')
const validator = require('validator')

const BooksSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        trim: true
    },
    description:{
        type: String
    },
    author:{
        type: String,
        required : true,
    },
    year:{
        type: Date,
        require: true,
    },
    rating:{
        //--------------
    },
    ISBN:{
        type: String,
        required: true
    },
    img:{
        type : String,
        required: true
    },
    download:{
        type: String ,
        required: true
    },
    creator:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    tokens : [{
        token:{
            type: String,
            required: true
        }}]
})


productSchema.methods.generateAuthToken = async function () {

    const product = this;
  
    const token = jwt.sign({_id : product._id.toString()}, 'secret');
  
    product.tokens = product.tokens.concat({token});
  
    await product.save();
  
    return token;
  };
  
const Books = mongoose.model('Books', BooksSchema);

module.exports = Books;