const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/user');

router.get('/user/:id', (req, res) => {
  User.findone({ _id: req.param.id })
    .select("-password")
    .then(user => {
      Post.find({ postedBy: req.param.id })
        .populate("postedBy", "_id name")
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err })
          }
          res.json({ user, posts })
        })
    }).catch(err => {
      return res.status(400).json({ error: "User not found" })
    })
})

router.put('/follow', (req, res) => {
  User.findByIdAndUpdate(req.body.followId, {
    $push: { followers: req.user._id }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      return res.status(422).json({ error: err })
    }
    User.findByIdAndUpdate(req.user._id, {
      $push: { following: req.body.followId }

    }, { new: true }).then(result => {
      res.json(result)
    }).catch(err => {
      return res.status(422).json({ error: err })
    })

  }
  )

})
router.put('/unfollow', (req, res) => {
  User.findByIdAndUpdate(req.body.unfollowId, {
    $pull: { followers: req.user._id }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      return res.status(422).json({ error: err })
    }
    User.findByIdAndUpdate(req.user._id, {
      $pull: { following: req.body.unfollowId }

    }, { new: true }).then(result => {
      res.json(result)
    }).catch(err => {
      return res.status(422).json({ error: err })
    })
  }
  )
})
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

router.delete('/delete/:userId', async (req, res) => {
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

module.exports = router;
