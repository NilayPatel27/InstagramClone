const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
                            res.json({ message: "saved successfully" })
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
                return res.status(422).json({ error: "user already exists with that name" })
            }
            res.json({ message: "user not exist" })
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router