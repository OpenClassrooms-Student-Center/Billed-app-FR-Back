const jwt = require('jsonwebtoken');

const secret = 'a-secret-word';

const encrypt = (value) => jwt.sign(
  {
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: value,
  },
  secret,
);

const isValid = (value) => new Promise((resolve, reject) => {
  jwt.verify(value, secret, (err, decoded) => {
    if (err) reject(err);
    resolve(decoded);
  });
});

module.exports = {
  encrypt,
  isValid,
};
