/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("employee", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("name").notNullable();
    table.string("phone_num").nullable();
    table.double("account").nullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("employee");
};
