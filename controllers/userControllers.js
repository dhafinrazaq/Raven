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
  const filterForExistingUsername = { username: userData.username };
  const filterForExistingEmail = { email: userData.email };

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

  const checkIfEmailExists = (passwordHash) => (user) => {
    if (user) {
      return res.status(400).json({ email: "That email already exists, please try another." });
    }

    saveUser(passwordHash);
  };

  const filterByEmail = (passwordHash) => {
    userUtils.findUser(
      filterForExistingEmail,
      false,
      checkIfEmailExists(passwordHash)
    );
  };

  const checkIfUsernameExists = (passwordHash) => (user) => {
    if (user) {
      return res.status(400).json({ username: "That username already exists, please try another." });
    }
    filterByEmail(passwordHash);
  };

  const filterByUsername = (passwordHash) => {
    userUtils.findUser(
      filterForExistingUsername,
      false,
      checkIfUsernameExists(passwordHash)
    );
  };

  userUtils.getBcryptHash(userData.password, filterByUsername);
};

const signInController = (req, res) => {
  // Form validation
  const { inputErrors, isValid } = validateSignInInput(req.body);

  // Check input validation
  if (!isValid) {
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
      return res.status(403).json({ password: "Password is incorrect" });
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
