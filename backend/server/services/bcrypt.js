const bcrypt = require('bcryptjs');
const saltRounds = 10;

exports.encrypt = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds,
      function (err, hashedPassword) {
        if (err) {
          reject(err)
        }
        else {
          resolve(hashedPassword)
        }
      });
  })
};

exports.checkPassword = async (password, userPassword) => await bcrypt.compare(password, userPassword);