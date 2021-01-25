const Project = require("../models/Project");

module.exports = (req, res, next) => {
  const projectId = req.params.id;

  Project.findById(projectId)
    .then((project) => {
      req.project = project;
      next();
    })
    .catch((err) => res.status(400).json({ msg: "project invalid" }));
};
