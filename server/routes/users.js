const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required.' });
    }

    const users = await User.find({
      name: { $regex: query, $options: 'i' }
    }).select('name fullName profileImage');

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to search users.' });
  }
});

module.exports = router;
