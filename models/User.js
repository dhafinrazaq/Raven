const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create User schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
    },
  ],
  projectsCollaborated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
    },
  ],
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "joinApplication",
    },
  ],
});

// Exports the model using the specified Schema
module.exports = mongoose.model("users", UserSchema);
