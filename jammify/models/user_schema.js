/* this models a user (i.e. someone who logs in) for the database */

'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

// the schema for a user
// note: a password should be at least 6 characters
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    profileId: Number
})


// mongoose middleware: hashes the password
UserSchema.pre('save', function(next) {
    console.log('UserSchema: going to hash password.')
    const user = this;

    // make sure we don't hash the password more than once
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})


// finds a user by comparing the hashed pw to a given pw
// e.g. when we log in
UserSchema.statics.findByUsernamePassword = function(username, password) {
    console.log(`UserSchema: attempting to find ${username} and ${password}`)
    const User = this
    
    // find user by email
    return User.findOne({username: username}).then((user) => {
        // if we don't find the user
        if (!user) {
            console.log(`UserSchema: username not found/valid.`)
            return Promise.reject()
        }
        // if we do have the user, check their password
        console.log(`UserSchema: ${username} found, now checking password.`)
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    console.log(`UserSchema: password okay.`)
                    resolve(user)
                } else {
                    console.log(`UserSchema: password is bad.`)
                    reject()
                }
            })
        })
    })
}

const User = mongoose.model('User', UserSchema)
module.exports = { User }