// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongodb server');
    }
    console.log('connected to mongodb server');
    const db = client.db('TodoApp');

    // db.collection('Todos').deleteMany({text: 'Eat snack'}).then((result) => {
    //     console.log(result);
    // });
    db.collection('Users').findOneAndUpdate({_id: new ObjectID('5b2f9022f466b32728e834bb')}, 
    {$inc: {
        age: -4,
    }}, 
    {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
   
  
    // client.close();
});