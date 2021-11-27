const express = require("express");
const router = express.Router();

const { login,createStudent } = require("../controllers/pmo-controller");

// router.post('/register', register)
router.post("/login", login);
router.post('/student', createStudent)

module.exports = router;
