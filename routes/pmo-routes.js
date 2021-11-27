const express = require("express");
const router = express.Router();

const {
  login,
  createSupervisors,
  createStudent,
  viewSupervisors,
} = require("../controllers/pmo-controller");

router.post("/login", login);
router.post("/create-supervisor", createSupervisors);
router.post("/student", createStudent);
router.get("/supervisors", viewSupervisors);

module.exports = router;
