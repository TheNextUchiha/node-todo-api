//Using MongoDB module v3+
// const MongoClient = require('mongodb').MongoClient; // The normal way
const {MongoClient, ObjectID} = require('mongodb'); //The ES6 destructuring way

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useUnifiedTopology: true}, (err, client) => {
    if(err) {
        return console.log('Unable to connect to the MongoDB server');
    }
    console.log('Connected to the MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to insert the todo.');
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 3));
    // });

    db.collection('Users').find({name: 'Farzan'}).toArray().then((docs) => {
        console.log('Todos:', docs);
    }, (err) => {
        console.log('Unable to fetch todo', err);
    });

    client.close();
});