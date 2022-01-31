const express = require("express");
const router = express.Router();

const {
  addProjectDetails,
  viewEvents,
  viewMeetings,
  viewMarks,
  viewprojects,
  viewSingleMeeting,
} = require("../controllers/student-controller");

//!authhentication middleware when attached
// router.patch("/add-details", addProjectDetails);

router.patch("/add-details/:rollno", addProjectDetails);
router.get("/projects/:rollno", viewprojects);
router.route("/events").get(viewEvents);
router.route("/meetings").get(viewMeetings);
router.route("/marks/:id").get(viewMarks);
// router.route("/marks/:id").get(viewSingleMeeting);

module.exports = router;
