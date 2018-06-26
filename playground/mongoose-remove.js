const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

//remove todo
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

Todo.findOneAndRemove({_id: '5b31d3d710b0f68c9a34080e'}).then((result) => {
    console.log(result);
})
// Todo.findByIdAndRemove('5b31d3d710b0f68c9a34080e').then((todo) => {
//     console.log(todo);
// })