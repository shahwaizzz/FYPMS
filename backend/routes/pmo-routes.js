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
  editEvent,
  deleteEvent,
  addMarks,
  getAllProjects,
  getSingleProject,
  deleteProject,
  updateProject,
  createProject,
  uploadTemplateDocuments,
  changePassword,
  Findtemplates,
  createPreliminary,
} = require("../controllers/pmo-controller");

//Student Routes

router.route("/gettemplates").get(Findtemplates);

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

//events routes
router.route("/events").get(viewEvents).post(createEvent);
router.route("/events/:id").delete(deleteEvent).put(editEvent);

//marks
router.route("/:id/marks").patch(addMarks);

// Manage Projects routes
router.route("/projects").get(getAllProjects).post(createProject);
router
  .route("/projects/:id")
  .get(getSingleProject)
  .delete(deleteProject)
  .put(updateProject);

router.route("/templates/upload").post(uploadTemplateDocuments);

router.route("/change-password").patch(changePassword);
router.route("/create-preliminary/:id").post(createPreliminary);
module.exports = router;
