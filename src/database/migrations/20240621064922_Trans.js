/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("transactions", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.uuid("item_id").references("id").inTable("store_item");
    table.uuid("emp_id").references("id").inTable("employee");
    table.string("item_name").notNullable();
    table.string("emp_name").notNullable();
    table.enu("type", ["بيع", "شراء"]).notNullable();
    table.double("amount").notNullable();
    table.double("price").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("transactions");
};
