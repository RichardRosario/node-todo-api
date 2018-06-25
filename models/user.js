var mongoose = require('mongoose');

var User = mongoose.model('Users', {
    email: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 10,
        trim: true
    } 
});

// var newUser = new User({
//     email: 'testtest.c',
//     password: '239085'
// });

// newUser.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
//     console.log('Unable to save user', err);
// })

module.exports = {User};