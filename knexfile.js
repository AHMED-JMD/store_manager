// Update with your config settings.
const { knexSnakeCaseMappers } = require("objection");
require("dotenv").config();

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "@Ahmed1a2b3c",
      database: "store_db",
    },
    migrations: {
      directory: "./src/database/migrations",
    },
    seeds: {
      directory: "./src/database/seeds",
    },
    ...knexSnakeCaseMappers(),
  },
};
