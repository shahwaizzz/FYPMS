const express = require("express");
const router = express.Router();

const { addProjectDetails } = require("../controllers/student-controller");

router.patch("/add-details", addProjectDetails);

module.exports = router;
