const isEmpty = require("lodash/isEmpty");
const validator = require("validator");

const passwordRequirements = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  returnScore: false,
  pointsPerUnique: 1,
  pointsPerRepeat: 0.5,
  pointsForContainingLower: 10,
  pointsForContainingUpper: 10,
  pointsForContainingNumber: 10,
  pointsForContainingSymbol: 10,
};

// Exports a function which checks for input validity when signing up
module.exports = (data) => {
  // Define an object to store all identified input errors
  const inputErrors = {};

  // Username checks
  if (isEmpty(data.username)) {
    inputErrors.username = "Please enter a username";
  }

  // Password checks
  if (isEmpty(data.password)) {
    inputErrors.password = "Please enter a password";
  } else if (!validator.isStrongPassword(data.password, passwordRequirements)) {
    inputErrors.password =
      "Your password must be at least 8 characters long and contain at " +
      "least one uppercase letter, one lower case letter, " +
      "one number and one special character. Please try another.";
  }

  // Email checks
  if (isEmpty(data.email)) {
    inputErrors.email = "Please enter your email";
  } else if (!validator.isEmail(data.email)) {
    inputErrors.email = "Please enter a valid email address";
  }

  return {
    inputErrors,
    isValid: isEmpty(inputErrors),
  };
};
