const express = require("express");
const router = express.Router();

const { login } = require("../controllers/pmo-controller");

// router.post('/register', register)
router.post("/login", login);

module.exports = router;
