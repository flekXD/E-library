const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./../middleware/auth.js");
const User = require('./../models/user_model.js');
const Books = require('./../models/books_model.js');
const router = new express.Router();

//all users
router.get("/users", async(req,res)=>{
    try {
        await User.find({}).then((users) => {
            res.status(200).send(users);
        })} catch (error){
        res.status(500).send();
    }
});
router.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        await User.findById(userId).then((users) => {
            res.status(200).send(users);
        })} catch (error){
        res.status(500).send();
    }
});
//create user
router.post('/user/add', async (req, res) => {
    const { nickname, email, password } = req.body;

    let user = new User({nickname: nickname , email: email, password: password});
    try{
        await user.save().then(() =>{
            console.log(user);
        })} catch (error){
        console.log(error)
    }
});
//delete  //rework*****
router.delete('/users/del/:id', auth, async (req, res) => {
    const userId = req.params.id;
    try {
        if(req.user.role == 'admin'){
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).send('User not found');
        }

        res.send(deletedUser);
    }
    } catch (error) {
        res.status(400).send(error);
    }
});


//authenticate
router.post("/users/me", async (req, res) => {
    try {
        // отримання користувача за його токеном
        const user = await User.findById(req.user._id);

        // заповнення віртуального поля product
        await user.populate('Books');

        res.send([user , user.Books]);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.post("/users/login", async (req,res)=>{
    try{
        const user = await User.findOneByCredentials(req.body.email , req.body.password);
        const token = await user.generateAuthToken();
        res.send({user,token});
    }catch (e){
        res.status(400).send()
    }
});
/*router.post("/users/logout", auth , async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
})*/
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/user',auth, async (req, res) => {
    const id  = req.user._id;
    const { nickname, email, password } = req.body;
    try {

        if (password) {
            req.body.password = await bcrypt.hash(password, 8);
        }
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.send(updatedUser);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/refresh', async (req, res) => {
    const refreshToken = req.body.refreshToken; // Assuming the refresh token is sent in the request body
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token is required' });
    }
  
    try {
      // Verify the refresh token
      const decoded = jwt.verify(refreshToken, 'your-refresh-token-secret-key');
  
      const user = await User.findById(decoded.userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a new access token
      const accessToken = user.generateAuthToken();
  
      res.json({ accessToken });
    } catch (error) {
      res.status(401).json({ message: 'Invalid refresh token' });
    }
  });

module.exports = router;