/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("store_item", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("name").notNullable();
    table.double("price").notNullable();
    table.double("sell_price").notNullable();
    table.string("location").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("store_item");
};
