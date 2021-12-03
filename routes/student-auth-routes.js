const express = require("express");
const router = express.Router();

const { login } = require("../controllers/student-auth");

router.post("/login", login);

module.exports = router;
