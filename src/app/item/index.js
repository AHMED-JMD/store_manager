const express = require("express");
const router = express.Router();
const { add, getAll, getById, update, deleteItem } = require("./controller");

router.post("/", add);

router.get("/", getAll);

router.get("/:id", getById);

router.put("/:id", update);

router.delete("/:id", deleteItem);

module.exports = router;
