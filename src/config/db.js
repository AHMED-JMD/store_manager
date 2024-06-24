const Knex = require("knex");
const { Model, knexSnakeCaseMappers } = require("objection");
require("dotenv").config();

//knex config options
const knex = Knex({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "@Ahmed1a2b3c",
    database: "store_db",
  },
  ...knexSnakeCaseMappers(),
});

//give knex db config to all objection models
Model.knex(knex);

module.exports = { knex };
