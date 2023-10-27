const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const User = require("./routers/user_route");
const Books = require("./routers/books_route");
require("dotenv").config()

let url = process.env.MONGO_URL;
let port = process.env.PORT
mongoose.connect(url)

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.get("/", (req,res)=>{
    res.send("Successful");
});
app.use(User);
app.use(Books);

app.listen(port, () => {
    console.log(`Server is listening on ${port} port`)
})
module.exports = app;