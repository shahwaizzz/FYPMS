const express = require("express");
const router = express.Router();

const { login,createStudent,viewStudent } = require("../controllers/pmo-controller");

// router.post('/register', register)
router.post("/login", login);
router.post('/student', createStudent)
router.get('/student', viewStudent)

module.exports = router;
