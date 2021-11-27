const express = require("express");
const router = express.Router();

const {
  login,
  createSupervisors,
  createStudent,
  viewStudentList,
  editStudent,
  viewSupervisors,
  deleteStudent
} = require("../controllers/pmo-controller");

router.post("/login", login);

//Student Routes
router.get('/students', viewStudentList)
router.post("/create-student", createStudent);
router.post("/edit-student", editStudent);
router.delete("/delete-student/:roll_number", deleteStudent);

//Supervisor Routes
router.get("/supervisors", viewSupervisors);
router.post("/create-supervisor", createSupervisors);

 




module.exports = router;
