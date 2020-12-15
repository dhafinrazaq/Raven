// Import statements
const express = require("express");
const router = express.Router();

// Get all user controllers that manipulate the user database
const userControllers = require("../../controllers/userControllers");

router.post("/signup", userControllers.signUpController);
router.post("/signin", userControllers.signInController);

router.get("/data", userControllers.getUserDataController);

module.exports = router;
