const express = require("express");
const router = express.Router();
const employee = require("../../app/employee/index");
const item = require("../../app/item/index");
const transaction = require("../../app/transaction/index");

router.use("/item", item);
router.use("/employee", employee);
router.use("/transaction", transaction);

module.exports = router;
