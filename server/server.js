const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
var port = process.env.PORT || 1234;  // process.env.PORT -> For Heroku, as Heroku use Linux servers

// Express Middleware
app.use(bodyParser.json());

// Express routes handlers
// GET routes

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(400).send();
        }

        res.send({todo});
    }).catch((e) => res.status(404).send());

});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

// POST routes
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.post('/users', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = new User(body);
        
        await user.save();
        const token = await user.generateAuthToken();

        res.header('x-auth', token).send(user);
    } catch(e) {
        res.status(400).send(e);
    }
});

app.post('/users/login', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();

        res.header('x-auth', token).send(user);
    } catch(e) {
        res.status(400).send();
    }
});

// DELETE routes
app.delete('/todos/:id', async (req, res) => {
    const id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    try {
        const todo = await Todo.findByIdAndRemove(id);

        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});

    } catch (e) {
        res.status(404).send();
    }
});

app.delete('/users/me/token', authenticate, async (req, res) => {
    try {
        await req.user.removeToken(req.token);
        res.status(200).send();
    } catch (e) {
        res.status(400).send();
    }
});

// PATCH routes
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => res.status(400).send());

});

// App initaite
app.listen(port, () => {
    console.log(`Server is up at port ${port}`);
});