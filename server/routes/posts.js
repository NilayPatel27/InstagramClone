const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.post('/add', async (req, res) => {
  try {
    const { userId, description, imageUrl } = req.body;

    if (!userId || !description || !imageUrl) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newPost = new Post({
      userId,
      description,
      imageUrl
    });

    await newPost.save();
    res.status(201).json({ message: 'Post added successfully!', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add post' });
  }
});

module.exports = router;
