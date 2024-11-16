const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Post = require('../models/Post');
const multer = require('multer');
const upload = multer();

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "user already exists with that email" })
            }
            bcrypt.hash(password, 15)
                .then(hashedpassword => {
                    const user = new User({
                        email,
                        password: hashedpassword,
                        name
                    })

                    user.save()
                        .then(user => {
                            const token = jwt.sign({ _id: user._id }, "Instagram@123");
                            const { _id, name, email } = user;
                            res.json({ token, user: { _id, name, email }, message: "Successfully signed up" });
                        })
                        .catch(error => {
                            console.log(err)
                        })
                })
        })

        .catch(err => {
            console.log(err)
        })
})

//username exist
router.post('/usernameexist', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    User.findOne({ name: name })
        .then((savedUser) => {
            if (savedUser) {
                return res.json({ message: "User already exists with that name" })
            }
            res.json({ message: "User not exist" })
        })
        .catch(err => {
            console.log(err)
        })
})

//email exist
router.post('/useremailexist', (req, res) => {
    const { email } = req.body
    if (!email) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.json({ message: "User already exists with that email" })
            }
            res.json({ message: "User not exist" })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    console.log({ email, password })
    if (!email || !password) {
        return res.status(422).json({ error: "Please add email or password" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid Email or password" })
            }
            console.log({ savedUser })
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        const token = jwt.sign(
                            { userId: savedUser._id.toString() },
                            'Instagram@123'
                        )
                        const { _id, name, email } = savedUser;
                        res.json({ token, user: { _id, name, email }, message: "Successfully signed in" });
                    } else {
                        return res.status(422).json({ error: "Invalid Email or password" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
});

router.post('/addposts', upload.none(), async (req, res) => {
    try {
        const { userId, feeds } = req.body;


        // Validate required fields
        if (!userId || !feeds) {
            return res.status(400).json({ error: 'userId and feeds are required' });
        }
        let feedsArray = feeds.split(',data:image').map((item, index) => {
            return index === 0 ? item : `data:image${item}`;
        });

        // Create a new post using the Post model
        const newPost = new Post({
            userId,
            feeds: feedsArray
        });

        // Save the new post to MongoDB
        await newPost.save();

        res.status(200).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//get all posts
router.get('/allposts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

//delete account by id
router.delete('/deleteaccount/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete user.' });
    }
});
module.exports = router