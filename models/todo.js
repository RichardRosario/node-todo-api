var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

// var newTodo = new Todo({
//     text: 'Eat Dinner'
// }); 

// var anotherTodo = new Todo({
//     text: ' upload files ',
//     completed: true,
//     completedAt: 123
// });

// anotherTodo.save().then((doc) => {
//  console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
//     console.log('Unable to save todo', err);
// });

module.exports = {Todo};