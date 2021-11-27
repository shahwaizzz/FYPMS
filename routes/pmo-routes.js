const express = require("express");
const router = express.Router();

const {
  login,
  createSupervisors,
  createStudent,
  viewSupervisors,
  viewStudent,
} = require("../controllers/pmo-controller");

router.post("/login", login);
router.get("/student", viewStudent);
router.post("/create-supervisor", createSupervisors);
router.post("/student", createStudent);
router.get("/supervisors", viewSupervisors);
router.post("/create-students", createStudent);

module.exports = router;
