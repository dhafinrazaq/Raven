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

  const setCookieAndSendResponse = (newUser) => (err, token) => {
    if (err) {
      throw err;
    }

    res.cookie("authentication", token, {
      maxAge: keys.authTTL,
      secure: false, // set to true if your using https
      httpOnly: true, // prevents XSS attacks
    });

    newUser.password = undefined;
    return res.json(newUser);
  };

  const getJWT = (newUser) => {
    userUtils.generateJWT(
      newUser,
      keys.authTTL,
      setCookieAndSendResponse(newUser)
    );
  };

  const saveUser = (passwordHash) => {
    userUtils.saveUser(userData, passwordHash, getJWT);
  };

  const checkIfUserExists = (passwordHash) => (user) => {
    if (user) {
      return res.json({ uid: "That username or email already exists" });
    }

    saveUser(passwordHash);
  };

  const getUser = (passwordHash) => {
    userUtils.findUser(
      filterForExistingUser,
      false,
      checkIfUserExists(passwordHash)
    );
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

  const setCookieAndSendResponse = (user) => (err, token) => {
    if (err) {
      throw err;
    }

    res.cookie("authentication", token, {
      maxAge: keys.authTTL,
      secure: false, // set to true if your using https
      httpOnly: true, // prevents XSS attacks
    });

    user.password = undefined;
    return res.json(user);
  };

  const authenticateUser = (user) => (isMatch) => {
    if (!isMatch) {
      return res.status(403).json({ password: "Incorrect password entered" });
    }

    userUtils.generateJWT(user, keys.authTTL, setCookieAndSendResponse(user));
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

const getUserDataController = (req, res) => {
  const sendResponse = (user) => {
    if (!user) {
      return res
        .status(404)
        .json({ error: "User no longer exists in the database" });
    }

    return res.json(user);
  };

  const getUserData = (filterForUserID) => {
    userUtils.findUser(filterForUserID, false, sendResponse);
  };

  userUtils.verifyJWT(req.cookies.authentication, getUserData);
};

module.exports = {
  signUpController,
  signInController,
  getUserDataController,
};
