const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const User = require("./routers/user_route");
const Product = require("./routers/product_route");
require("dotenv").config()

let url = process.env.MONGO_URL;
let port = process.env.PORT
mongoose.connect(url)

const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.get("/", (req,res)=>{
    res.send("Successful");
});
app.use(User);
app.use(Product);

app.listen(port, () => {
    console.log(`Server is listening on ${port} port`)
})
module.exports = app;