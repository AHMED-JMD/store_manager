const express = require("express");
const router = express.Router();
const {
  add,
  getAll,
  filter,
  getById,
  update,
  deleteTran,
} = require("./controller");

router.post("/", add);

router.get("/", getAll);

router.post("/filter", filter);

router.get("/:id", getById);

router.put("/:id", update);

router.delete("/:id", deleteTran);

module.exports = router;
