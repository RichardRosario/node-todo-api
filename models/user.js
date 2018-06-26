const mongoose = require('mongoose');
const validator = require('validator');

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{value} email is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        trim: true
    },
    token: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }

    }] 
});

module.exports = {User};