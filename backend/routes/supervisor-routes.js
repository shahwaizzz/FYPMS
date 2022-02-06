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
  updatemeeting,
  addmeetingnotes,
  getAllMeetings,
} = require("../controllers/supervisor-controller");

// router.post("/project", createProject).get(getAllProjects);
router.route("/projects/:id").get(getAllProjects).post(createProject);
router
  .route("/projects/:id")
  .get(getSingleProject)
  .delete(deleteProject)
  .patch(updateProject);
router.route("/events").get(viewEvents);
router.route("/meetings").get(getAllMeetings);
router.route("/create-meeting").post(createMeeting);
// router.route("/updatemeetingdocs/:id").patch(updatemeetingdocs);
router.route("/getmeetings/:id").get(viewMeetings);
router.route("/marks").patch(addMarks);
router.route("/addmeetingnotes").patch(addmeetingnotes);
router.route("/updatemeeting/:id").patch(updatemeeting);

module.exports = router;
