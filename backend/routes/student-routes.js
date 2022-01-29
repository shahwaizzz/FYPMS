const express = require("express");
const router = express.Router();

const {
  addProjectDetails,
  viewEvents,
  viewMeetings,
  viewMarks,
  viewSingleMeeting,
} = require("../controllers/student-controller");

router.patch("/add-details", addProjectDetails);
router.route("/events").get(viewEvents);
router.route("/meetings").get(viewMeetings);
router.route("/marks").get(viewMarks);
router.route("/marks/:id").get(viewSingleMeeting);

module.exports = router;
