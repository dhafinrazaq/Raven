const userUtils = require("../util/userUtils");

module.exports = (req, res, next) => {
  const token = req.cookies.authentication;

  if (!token) {
    return res
      .status(401)
      .json({ msg: "No token, access denied", isExpired: false });
  }

  try {
    const setUser = (user) => {
      req.user = user;
      next();
    };

    const getUserData = (filterForUserID) => {
      userUtils.findUser(filterForUserID, false, setUser);
    };

    userUtils.verifyJWT(token, getUserData);
  } catch (e) {
    if (e.name == "TokenExpiredError") {
      return res.status(400).json({ msg: "jwt expired", isExpired: true });
    }
    return res.status(400).json({ msg: "jwt invalid", isExpired: false });
  }
};
