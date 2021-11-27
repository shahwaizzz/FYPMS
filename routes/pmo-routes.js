const express = require("express");
const router = express.Router();

const { login, createSupervisors } = require("../controllers/pmo-controller");

router.post("/login", login);
router.post("/create-supervisor", createSupervisors);

module.exports = router;
