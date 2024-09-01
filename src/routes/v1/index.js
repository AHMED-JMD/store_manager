const express = require("express");
const router = express.Router();
const employee = require("../../app/employee/index");
const item = require("../../app/item/index");
const transaction = require("../../app/transaction/index");
const report = require("../../app/reports/index");

router.use("/item", item);
router.use("/employee", employee);
router.use("/transaction", transaction);
router.use("/reports", report);

module.exports = router;
