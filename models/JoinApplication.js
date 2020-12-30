const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create JoinApplication schema
const JoinApplicationSchema = new Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
  },
  answer: {
    type: String,
  },
});

// Exports the model using the specified Schema
module.exports = mongoose.model("joinApplication", JoinApplicationSchema);
