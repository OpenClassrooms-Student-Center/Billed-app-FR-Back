const bcrypt = require('bcrypt');

const saltRounds = 10;

const hash = (value) => new Promise((resolve, reject) => {
  bcrypt.hash(value, saltRounds, (err, hashValue) => {
    if (err) reject(err);
    resolve(hashValue);
  });
});

const compare = (value, hashValue) => new Promise((resolve, reject) => {
  bcrypt.compare(value, hashValue, (err, result) => {
    if (err) reject(err);
    resolve(result);
  });
});

module.exports = {
  hash,
  compare,
};
