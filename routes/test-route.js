const express = require("express");
const router = express.Router();

const { createProject } = require("../controllers/test-controller");

router.post("/project", createProject);

module.exports = router;
