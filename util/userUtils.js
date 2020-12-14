const bcrypt = require("bcryptjs");

// Get User model (Using Schema made in another file)
const User = require("../models/User");

const getBcryptHash = (input, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      throw err;
    }

    bcrypt.hash(input, salt, (err, hash) => {
      if (err) {
        throw err;
      }

      callback(hash);
    });
  });
};

const comparePassword = (givenPassword, existingPassword, callback) => {
  bcrypt.compare(givenPassword, existingPassword).then((isMatch) => {
    callback(isMatch);
  });
};

const saveUser = (userData, passwordHash, callback) => {
  const newUser = new User({
    username: userData.username,
    email: userData.email,
    password: passwordHash,
  });

  newUser
    .save()
    .then((newUser) => {
      callback(newUser);
    })
    .catch((err) => console.log(err));
};

const findUser = (conditions, includePassword, callback) => {
  let toSelect = "";
  if (includePassword) {
    toSelect = "+password";
  }

  User.findOne(conditions).select(toSelect).then((user) => callback(user));
};

module.exports = {
  getBcryptHash,
  comparePassword,
  saveUser,
  findUser,
};
