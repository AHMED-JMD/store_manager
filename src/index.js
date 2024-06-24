const express = require("express");
const { ErrorHandler, ErrorConverter } = require("./middlwares/errors");
const routes = require("./routes");
require("dotenv").config();

async function bootstrab() {
  const app = express();

  //middlwares
  app.use(express.json({ limit: "30mb" }));
  app.use(express.urlencoded({ extended: false, limit: "3mb" }));

  //helmet for security - compression compress res size - cors resource share
  app.use(require("helmet")());
  app.use(require("compression")());
  app.use(require("cors")());

  //require knex configs & initialize
  require("./config/db");

  //setting routes
  app.use("/api", routes);

  // handle errors
  app.use(ErrorConverter);
  app.use(ErrorHandler);

  return app;
}

module.exports = { bootstrab };
