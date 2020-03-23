const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, res) => {
        console.log(res);
    });
});

// var hashedPass = '$2a$10$wCTG0ZHttmNuI0dOkF6bIO6E7GURnnJeVPurqVesrB5m9XLkbVmNW';

// bcrypt.compare(password, hashedPass, (err, res) => {
//     console.log(res);
// });