//Using MongoDB module v3+
// const MongoClient = require('mongodb').MongoClient; // The normal way
const {MongoClient, ObjectID} = require('mongodb'); //The ES6 destructuring way

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useUnifiedTopology: true}, (err, client) => {
    if(err) {
        return console.log('Unable to connect to the MongoDB server');
    }
    console.log('Connected to the MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5e6f3213915081371cea2ffe')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    // Challenge
    
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5e70765891e62d255cb28e63')
    }, {
        $set: {
            name: 'Farzan'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    client.close();
});