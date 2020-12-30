const express = require("express");
const multer = require("multer");
const path = require("path");
const authMiddleware = require("../../middleware/auth-jwt");
const projectDetailMiddleware = require("../../middleware/projectDetail");

const router = express.Router();

// Get utility functions
const userUtils = require("../../util/userUtils");

// project model
const Project = require("../../models/Project");
const User = require("../../models/User");
const JoinApplication = require("../../models/JoinApplication");

// @route GET api/projects
// @desc get all projects
// @access public
router.get("/", (req, res) => {
  Project.find()
    .sort({ date: -1 })
    .then((projects) => res.json(projects))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route POST api/projects
// @desc create a project
// @access public
router.post("/", authMiddleware, (req, res) => {
  const user = req.user;

  const newProject = new Project({
    name: req.body.name,
    description: req.body.description,
    author: user.id,
  });

  newProject.save().then((project) => {
    res.json(project);
    user.projects.push(project._id);
    user.save();
  });
});

// @route DELETE api/projects/:id
// @desc delete a project
router.delete("/:id", authMiddleware, (req, res) => {
  const user = req.user;

  user.projects = user.projects.filter((id) => {
    return id !== req.params.id;
  });

  user.save();

  Project.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route GET api/projects/:id
// @desc get a project
// @access public
router.get("/:id", async (req, res) => {
  const getProjectWithPopulate = function (query) {
    return Project.findById(query).populate("author");
  };

  const project = await getProjectWithPopulate(req.params.id);
  res.json(project);
});

// @route PUT api/projects/:id
// @desc update a project
// @access public
router.put("/:id", authMiddleware, async (req, res) => {
  const putProjectWithPopulate = function (query, updated) {
    return Project.findByIdAndUpdate(query, updated, {
      returnOriginal: false,
      new: true,
    }).populate("author");
  };

  const project = await putProjectWithPopulate(req.params.id, req.body);
  res.json(project);
});

const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const upload = multer();

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  async (req, res, next) => {
    const {
      file,
      body: { id },
    } = req;

    if (file.detectedFileExtension != ".jpg")
      return res
        .status(400)
        .json({ msg: "Invalid file type. The image must be of a .jpg format" });

    const fileName = id + file.detectedFileExtension;

    await pipeline(
      file.stream,
      fs.createWriteStream(`${__dirname}/../../public/images/${fileName}`)
    );

    const putProjectWithPopulate = function (query, updated) {
      return Project.findByIdAndUpdate(query, updated, {
        returnOriginal: false,
        new: true,
      }).populate("author");
    };

    const project = await putProjectWithPopulate(id, {
      img: {
        data: fs.readFileSync(
          path.join(`${__dirname}/../../public/images/${fileName}`)
        ),
        contentType: "image/jpg",
      },
    });
    res.json(project);
  }
);

// @route GET api/projects
// @desc get all join project application forms
router.get("/:id/join", (req, res) => {
  JoinApplication.find()
    .sort({ date: -1 })
    .then((applications) => res.json(applications))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route POST api/projects/:id/join
// @desc submit a join project application form
router.post(
  "/:id/join",
  [authMiddleware, projectDetailMiddleware],
  (req, res) => {
    const user = req.user;
    const project = req.project;
    console.log("post router");

    const newApplication = new JoinApplication({
      applicant: user._id,
      project: req.params.id,
      answer: req.body.answer,
    });

    newApplication.save().then((application) => {
      res.json(application);
      user.applications.push(application._id);
      user.save();
      project.applications.push(application._id);
      project.save();
    });
  }
);

module.exports = router;
