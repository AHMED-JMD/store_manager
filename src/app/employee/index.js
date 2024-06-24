const express = require("express");
const router = express.Router();
const { getAll, getById, add, update, deleteEmp } = require("./controller.js");

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", add);

router.put("/:id", update);

router.delete("/:id", deleteEmp);

module.exports = router;
