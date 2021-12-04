const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProjects,
  getSingleProject,
  deleteProject,
  updateProject,
} = require("../controllers/supervisor-controller");

// router.post("/project", createProject).get(getAllProjects);
router.route("/projects").get(getAllProjects).post(createProject);
router
  .route("/projects/:id")
  .get(getSingleProject)
  .delete(deleteProject)
  .patch(updateProject);

module.exports = router;
