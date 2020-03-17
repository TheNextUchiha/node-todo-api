//Using MongoDB module v3+
// const MongoClient = require('mongodb').MongoClient; // The normal way
const {MongoClient} = require('mongodb'); //The ES6 destructuring way

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
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

    db.collection('Users').insertOne({
        name: 'Varizna',
        age: 45,
        location: 'Daman'
    }, (err, result) => {
        if(err) {
            return console.log('Unable to insert the todo');
        }

        console.log(JSON.stringify(result.ops, undefined, 3));
    });

    client.close();
});