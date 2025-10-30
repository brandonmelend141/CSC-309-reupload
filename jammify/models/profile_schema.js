// this is the mongoose model representing an individual's profile information
const mongoose = require('mongoose')


const imageSchema = mongoose.Schema({
    image_id: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    created_at: String
});


const profileSchema = new mongoose.Schema({
    profileId: Number,
    profilePic: [imageSchema],
    personalInfo: {
        description: String,
        name: String,
        gender: String,
        age: Number
    },
    works: {
        albums: [String],
        singles: [String]
    },
    offering: [String],
    lookingFor: [String],
    genres: [String],
    collaborators: [Number],
    workDone: Number,
    contactInfo: {
        phone: String,
        email: String
    },
    gallery: [imageSchema],
    tags: [String]
})

const Profile = mongoose.model("Profile", profileSchema)

module.exports = { Profile } 