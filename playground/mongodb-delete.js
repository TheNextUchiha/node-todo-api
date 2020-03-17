//Using MongoDB module v3+
// const MongoClient = require('mongodb').MongoClient; // The normal way
const {MongoClient, ObjectID} = require('mongodb'); //The ES6 destructuring way

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to the MongoDB server');
    }
    console.log('Connected to the MongoDB server');
    const db = client.db('TodoApp');

    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat the lunch'}).then((result) => {
    //     console.log(result);
    // }); 

    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat the lunch'}).then((result) => {
    //     console.log(result);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({text: 'Walk the dog'}).then((result) => {
    //     console.log(result);
    // });

    // Challenge
    // db.collection('Users').deleteMany({name: 'Farzan'}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5e70763d7bc0691c447e4bf6')}).then((result) => {
        console.log(result);
    });

    client.close();
});