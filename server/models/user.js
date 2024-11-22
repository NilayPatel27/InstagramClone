const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: false
    },
    userName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    followers: [String],
    following: [String]
})

mongoose.model("User", userSchema)