const mongoURI = process.env.mongoURI;
const mongoAtlasURI = process.env.mongoAtlasURI;
const authSecret = process.env.authSecret;
const authTTL = process.env.authTTL;
const emailSecret = process.env.emailSecret;
const emailAddress = process.env.emailAddress;
const emailPassword = process.env.emailPassword;

module.exports = {
  mongoURI,
  mongoAtlasURI,
  authSecret,
  authTTL,
  emailSecret,
  emailAddress,
  emailPassword,
};
