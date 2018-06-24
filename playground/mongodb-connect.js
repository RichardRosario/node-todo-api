// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongodb server');
    }
    console.log('connected to mongodb server');
    const db = client.db('TodoApp');

    db.collection('Todos').insertOne({
        text: 'Another thing to do',
        completed: true
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert todo');
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    }); 

    db.collection('Users').insertOne(
        {
        name: 'Marivic',
        age: 49,
        location: 'Philipines'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to connect to mongo server', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    })

    client.close();
});