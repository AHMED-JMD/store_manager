// Update with your config settings.
const { knexSnakeCaseMappers } = require("objection");
require("dotenv").config();

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: `${process.env.DBHOST}`,
      port: 3306,
      user: `${process.env.DBUSER}`,
      password: `${process.env.DBPASSWORD}`,
      database: `${process.env.DBURL}`,
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
