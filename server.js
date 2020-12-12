// Retrieve confidential information from .env file
const result = require('dotenv').config()

if (result.error) {
  throw result.error
}

// import statements
const express = require("express");
const mongoose = require("mongoose");
const { queryParser } = require('express-query-parser');
const usersRouter = require("./routes/api/users");
const projectsRouter = require("./routes/api/projects");
const helmet = require("helmet");
const compression = require('compression');

// Initialize app to a server
const app = express();
const cors = require("cors");

var corsOptions = {
	// Specifies the origin(s) from which a server request can occur aside from its own origin
    origin: 'http://localhost:3000',
}

app.use(cors(corsOptions));
// Increase security by configuring headers
app.use(helmet());
// Compresses the request from client
app.use(compression());

// Allows parsing of JSON from client
app.use(express.json());

// Allows parsing of x-www-form-urlencoded
app.use(express.urlencoded({
    extended: false
}));

// Converts booleans in url parameter into actual booleans instead of treating them like string, similarly for null
app.use(
    queryParser({
      parseNull: true,
      parseBoolean: true
    })
);

// Gets the URI of the MongoDB database used by app
const db = require("./config/keys").mongoURI; // Can change to mongoAtlasURI to connect to cloud database

// mongoDB settings
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    // autoIndex: true, // Will result in rejection of duplicate entries
    keepAlive: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
    useFindAndModify: false,
    useUnifiedTopology: true
  }

// Connect to the specified MongoDB database
mongoose.connect(db, options)
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Routes
app.use("/api/users", usersRouter);
app.use("/api/projects", projectsRouter);

// Uses process.env.PORT if available otherwise 5000
const port = process.env.PORT || 5000;

// Tells the server which port to listen on
app.listen(port, () => console.log(`Server up and running on port ${port}!`));
