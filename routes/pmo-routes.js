const express = require("express");
const router = express.Router();

const {
  login,
  createSupervisors,
  createStudent,
  viewStudentList,
  editStudent,
  viewSupervisors
} = require("../controllers/pmo-controller");

router.post("/login", login);
router.get('/students', viewStudentList)
router.post("/create-supervisor", createSupervisors);
router.post("/create-student", createStudent);
router.post("/edit-student", editStudent);
router.get("/supervisors", viewSupervisors);
 




module.exports = router;
