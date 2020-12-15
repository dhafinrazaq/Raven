const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// project model
const Project = require("../../models/Project");

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
router.post("/", (req, res) => {
  const newProject = new Project({
    name: req.body.name,
    description: req.body.description,
  });

  newProject.save().then((project) => res.json(project));
});

router.delete("/:id", (req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route GET api/projects/:id
// @desc get a project
// @access public
router.get("/:id", (req, res) => {
  Project.findById(req.params.id)
    .then((project) => res.json(project))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route PUT api/projects/:id
// @desc update a project
// @access public
router.put("/:id", (req, res) => {
  Project.findByIdAndUpdate(req.params.id, req.body, {
    returnOriginal: false,
    new: true,
  })
    .then((project) => res.json(project))
    .catch((err) => res.status(404).json({ success: false }));
});

const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const upload = multer();

router.post("/upload", upload.single("file"), async (req, res, next) => {
  const {
    file,
    body: { id },
  } = req;

  console.log(file);
  if (file.detectedFileExtension != ".jpg")
    next(new Error("invalid file type"));

  const fileName = id + file.detectedFileExtension;

  await pipeline(
    file.stream,
    fs.createWriteStream(`${__dirname}/../../public/images/${fileName}`)
  );

  Project.findByIdAndUpdate(
    id,
    {
      img: {
        data: fs.readFileSync(
          path.join(`${__dirname}/../../public/images/${fileName}`)
        ),
        contentType: "image/jpg",
      },
    },
    {
      returnOriginal: false,
      new: true,
    }
  )
    .then((project) => res.json(project))
    .catch((err) => res.status(404).json({ success: false }));
  // res.redirect("/");
});

module.exports = router;
