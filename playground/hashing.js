const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, res) => {
//         console.log(res);
//     });
// });

var hashedPass = '$2a$10$fJXXeDgkYH3baQvGSTVequ/9JfmaqeDhwN6KvwS9yNr/QBLGSW.6a';

bcrypt.compare(password, hashedPass, (err, res) => {
    console.log(res);
});