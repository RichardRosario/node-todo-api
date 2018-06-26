require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('../models/todo');
var {User} = require('../models/user');

var app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
   var todo = new Todo({
       text: req.body.text
   });
   
   todo.save().then((doc) => {
    res.send(doc);
   }, (err) => {
    res.status(400).send(err);
   })
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }, (err) => {
        res.status(400).send(err);
    })
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid) {
        return res.status(400).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
    res.send({todo});

    }).catch((err) => {
        res.status(400).send();
    })
});


app.delete('/todos/:id', (req, res) => {
   var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(400).then();
        }
        res.send(todo);
    }).catch((err) => {
        res.status(404).send();
    })
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }
    
        if (_.isBoolean(body.completed) && body.completed) {
body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
        .then((todo) => {
            if (!todo) {
                return res.status(404).send()
            }
            res.send({todo});
    }).catch((err) => {
        res.status(400).send();
    })
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    var user = new User(body);
    user.save().then((user) => {
        res.send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });
})

app.listen(port, () => {
    console.log(`Started at port ${port}`);
});

module.exports = {app} 