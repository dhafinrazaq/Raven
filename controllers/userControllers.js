const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Get utility functions
const userUtils = require("../util/userUtils");

// Get input validation functions
const validateSignUpInput = require("../validators/signUpValidation");
const validateSignInInput = require("../validators/signInValidation");

const signUpController = (req, res) => {
  // Form validation
  const { inputErrors, isValid } = validateSignUpInput(req.body);

  // Check input validation
  if (!isValid) {
    return res.status(400).json(inputErrors);
  }

  const userData = req.body;
  const filterForExistingUser = {
    $or: [{ username: userData.username }, { email: userData.email }],
  };

  const sendResponse = (newUser) => {
    return res.json(newUser);
  };

  const saveAndSendResponse = (passwordHash) => {
    userUtils.saveUser(userData, passwordHash, sendResponse);
  };

  const checkIfUserExists = (passwordHash) => (user) => {
    if (user) {
      return res.json({ uid: "That username or email already exists" });
    }

    saveAndSendResponse(passwordHash);
  };

  const getUser = (passwordHash) => {
    userUtils.findUser(filterForExistingUser, false, checkIfUserExists(passwordHash));
  };

  userUtils.getBcryptHash(userData.password, getUser);
};

const signInController = (req, res) => {
  // Form validation
  const { inputErrors, isValid } = validateSignInInput(req.body);

  // Check input validation
  if (!isValid) {
    console.log(inputErrors);
    return res.status(400).json(inputErrors);
  }

  const userData = req.body;
  const filterForExistingUser = {
    $or: [{ username: userData.uid }, { email: userData.uid }],
  };

  const sendResponse = (user) => {
    user.password = undefined;
    return res.json(user);
  };

  const authenticateUser = (user) => (isMatch) => {
    if (!isMatch) {
      return res.status(403).json({ password: "Incorrect password entered" });
    }

    sendResponse(user);
  };

  const checkIfUserIsValid = (user) => {
    if (!user) {
      return res
        .status(400)
        .json({ uid: "The specified username or email does not exist" });
    }

    userUtils.comparePassword(
      userData.password,
      user.password,
      authenticateUser(user)
    );
  };

  userUtils.findUser(filterForExistingUser, true, checkIfUserIsValid);
};

module.exports = {
  signUpController,
  signInController,
};
