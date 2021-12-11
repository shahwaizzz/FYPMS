const express = require("express");
const router = express.Router();

const {
  addProjectDetails,
  viewEvents,
} = require("../controllers/student-controller");

router.patch("/add-details", addProjectDetails);
router.route("/events").get(viewEvents);

module.exports = router;
