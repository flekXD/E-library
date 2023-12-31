const mongoose = require('mongoose')
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
        type: Number, 
        default: 0,
    },
    img:{
        type : String,
        required: false,
        default: ""
    },
    download:{
        type: String ,
        required: false,
        default: ""
    },
    Genres:[{
        type : String,
        required: true
    }],
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


BooksSchema.methods.generateAuthToken = async function () {

    const product = this;
  
    const token = jwt.sign({_id : product._id.toString()}, 'secret');
  
    product.tokens = product.tokens.concat({token});
  
    await product.save();
  
    return token;
  };

BooksSchema.methods.updateRating = function (newRating) {
    this.rating = newRating;
    return this.save();
}
  
const Books = mongoose.model('Books', BooksSchema);

module.exports = Books;