const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

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
<<<<<<< Updated upstream
<<<<<<< HEAD
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}],
=======
    bio: {
        type: String,
        required: false
    },
    followers: [String],
    following: [String]
>>>>>>> cb22162f792e80d4aeedf3989e8ef63fd1b7be4c
=======
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}],
>>>>>>> Stashed changes
})

mongoose.model("User", userSchema)