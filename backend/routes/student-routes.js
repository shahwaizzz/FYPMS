const express = require("express");
const router = express.Router();

const {
  addProjectDetails,
  viewEvents,
  viewMeetings,
  viewMarks,
  viewprojects,
  viewSingleMeeting,
  updateProject,
  updatemeetingdocs
} = require("../controllers/student-controller");

//!authhentication middleware when attached
// router.patch("/add-details", addProjectDetails);

router.patch("/add-details/:rollno", addProjectDetails);
router.get("/projects/:rollno", viewprojects);
router.patch("/updateproject/:rollno/:flag",updateProject)
router.patch("/addmeetingdocs/:id/:rollno",updatemeetingdocs)
router.route("/events").get(viewEvents);
router.route("/meetings").get(viewMeetings);
router.route("/marks/:id").get(viewMarks);
// router.route("/marks/:id").get(viewSingleMeeting);

module.exports = router;
