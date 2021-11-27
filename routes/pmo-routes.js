const express = require("express");
const router = express.Router();

const {
  login,
  createSupervisors,
  createStudent,
} = require("../controllers/pmo-controller");

router.post("/login", login);
router.post("/create-supervisor", createSupervisors);
router.post("/student", createStudent);

module.exports = router;
