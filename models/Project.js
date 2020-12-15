const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = Project = mongoose.model("project", ProjectSchema);
