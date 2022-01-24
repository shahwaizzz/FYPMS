const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProjects,
  getSingleProject,
  deleteProject,
  updateProject,
  viewEvents,
  createMeeting,
  viewMeetings,
  addMarks,
} = require("../controllers/supervisor-controller");

// router.post("/project", createProject).get(getAllProjects);
router.route("/projects").get(getAllProjects).post(createProject);
router
  .route("/projects/:id")
  .get(getSingleProject)
  .delete(deleteProject)
  .patch(updateProject);
router.route("/events").get(viewEvents);
router.route("/create-meeting").post(createMeeting).get(viewMeetings);
router.route("/marks").patch(addMarks);
module.exports = router;
