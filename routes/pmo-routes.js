const express = require("express");
const router = express.Router();

const {
  createStudent,
  viewStudentList,
  editStudent,
  getStudent,
  deleteStudent,
  createSupervisors,
  getSupervisor,
  editSupervisor,
  viewSupervisors,
  deleteSupervisor,
} = require("../controllers/pmo-controller");

//Student Routes
router.route("/students").get(viewStudentList).post(createStudent);
router
  .route("/students/:id")
  .get(getStudent)
  .delete(deleteStudent)
  .patch(editStudent);

//Supervisor Routes
router.route("/supervisors").get(viewSupervisors).post(createSupervisors);
router
  .route("/supervisors/:id")
  .get(getSupervisor)
  .delete(deleteSupervisor)
  .patch(editSupervisor);

module.exports = router;
