const Project = require("../models/Project");

module.exports = (req, res, next) => {
  const projectId = req.params.id;

  try {
    Project.findById(projectId).then((project) => {
      req.project = project;
      next();
    });
  } catch (e) {
    return res.status(400).json({ msg: "project invalid" });
  }
};
