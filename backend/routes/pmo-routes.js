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
  viewEvents,
  createEvent,
  addMarks,
  getAllProjects,
  getSingleProject,
  deleteProject,
  updateProject,
  createProject,
} = require("../controllers/pmo-controller");

//Student Routes
router.route("/students").get(viewStudentList).post(createStudent);

router
  .route("/students/:id")
  .get(getStudent)
  .delete(deleteStudent)
  .put(editStudent);

//Supervisor Routes
router.route("/supervisors").get(viewSupervisors).post(createSupervisors);

router
  .route("/supervisors/:id")
  .get(getSupervisor)
  .delete(deleteSupervisor)
  .put(editSupervisor);

router.route("/events").get(viewEvents).post(createEvent);
router.route("/:id/marks").patch(addMarks);

// Manage Projects routes
router.route("/projects").get(getAllProjects).post(createProject);
router
  .route("/projects/:id")
  .get(getSingleProject)
  .delete(deleteProject)
  .patch(updateProject);
module.exports = router;
