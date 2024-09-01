const express = require("express");
const { homeReport } = require("./controller");
const router = express.Router();

router.post("/home_report", homeReport);

module.exports = router;
