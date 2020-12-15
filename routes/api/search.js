const express = require("express");

const router = express.Router();

const Project = require("../../models/Project");

// @route GET search/:query
// @desc get all project with query as part of the name
// @access public
// Solution below adapted from https://www.youtube.com/watch?v=9_lKMTXVk64
router.get("/:query", (req, res) => {
  const regex = new RegExp(escapeRegex(req.params.query), "gi");

  Project.find({ name: regex })
    .then((project) => res.json(project))
    .catch((err) => res.status(404).json({ success: false }));
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
