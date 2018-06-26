const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
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

UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, '123456').toString();

    user.tokens = user.tokens.concat([{access, token}]);
    return user.save().then(() => {
        return token;
    })
};

var User = mongoose.model('User', UserSchema );

module.exports = {User};