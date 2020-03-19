const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

var id = '5e710797a356ae16c8a127c3';

// if(!ObjectID.isValid(id)) {
//     console.log('ID is invalid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos ', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo ', todo);
// });

// Todo.findById(id).then((todo) => {
//     console.log('Find by id ', todo);
// });

User.findById(id).then((user) => {
    if(!user) {
        return console.log('user not found');
    }
    console.log('User ', user);
}).catch((e) => console.log(e));