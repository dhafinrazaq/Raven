const isEmpty = require("lodash/isEmpty");

// Exports a function which checks for input validity when signing in
module.exports = (data) => {
  // Define an object to store all identified input errors
  const inputErrors = {};

  // Uid checks
  if (isEmpty(data.uid)) {
    inputErrors.uid = "Please enter your username or email address";
  }

  // Password checks
  if (isEmpty(data.password)) {
    inputErrors.password = "Please enter your password";
  }

  return {
    inputErrors,
    isValid: isEmpty(inputErrors)
  };
};
