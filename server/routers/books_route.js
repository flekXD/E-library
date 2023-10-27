const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./../middleware/auth.js");
const User = require('./../models/user_model.js');
const Books = require('./../models/books_model.js');
const router = new express.Router();

router.get("/books", async(req,res)=>{
    try {
        await Books.find({}).then((books) => {
            res.status(200).send(books);
        })} catch (error){
        res.status(500).send();
    }
});

router.get('/books/fast_search/:name', async (req, res) => {
    try {
        const books = await Books.find({ name: { $regex: req.params.name, $options: 'i' } });
        if (!books) {
            return res.status(404).send()
        }
        res.json(books);
        } catch (e) {
        res.status(400).send(e)
    }
});

router.get('/books/:id', auth, async (req, res) => {
    try {
        const books = await Books.findOne({ _id: req.params.id, creator: req.user._id })
        const token = await books.generateAuthToken();
        await books.populate('creator');
        if (!books) {
            return res.status(404).send()
        }

        res.send({books,token})
    } catch (e) {
        res.status(400).send(e)
    }
});

router.post('/books/add', auth, async (req, res) => {
    const { name, description, author, year, rating, img, download, Genres } = req.body;

    const book = new Books({
        name: name,
        description: description,
        author: author,
        year: year,
        rating: rating,
        img: img,
        download: download,
        Genres: Genres,
        creator: req.user.id,
    });
    
    try {
        await book.save().then(() => {
            console.log(book);
        });
    } catch (error) {
        console.log(error);
    }
    
});

router.delete('/books/del/:id',auth, async (req, res) => {
    try {
        const books = await Books.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!books) {
            return res.status(404).send()
        }

        res.send(books)
    } catch (e) {
        res.status(500).send()
    }
});

router.patch('/book/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'author', 'year', 'rating', 'img', 'download', 'Genres'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const book = await Books.findOne({ _id: req.params.id, creator: req.user.id });

        if (!book) {
            return res.status(404).send();
        }

        updates.forEach((update) => book[update] = req.body[update]);
        await book.save();
        res.send(book);
    } catch (e) {
        res.status(400).send(e);
    }
});

/*router.patch('/book/lower/:id', auth, async (req, res) => {
    const book = await Books.findOne({ _id: req.params.id })
    book.updateRating(-1)
  .then((updatedBook) => {
    // The book's rating has been updated
    console.log(`Updated rating: ${updatedBook.rating}`);
  })
  .catch((error) => {
    console.error(error);
  });
});

router.patch('/book/raise/:id', auth, async (req, res) => {
    const book = await Books.findOne({ _id: req.params.id })
    book.updateRating(1)
  .then((updatedBook) => {
    // The book's rating has been updated
    console.log(`Updated rating: ${updatedBook.rating}`);
  })
  .catch((error) => {
    console.error(error);
  });
});*/
module.exports = router;