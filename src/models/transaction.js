const { format } = require("mysql2");
const { Model } = require("objection");

class Transaction extends Model {
  static get tableName() {
    return "transactions";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["item_id", "emp_id", "type", "amount", "price"],

      properties: {
        id: { type: "string", format: "uuid" },
        item_id: { type: "string", format: "uuid" },
        emp_id: { type: "string", format: "uuid" },
        item_name: { type: "string" },
        emp_name: { type: "string" },
        type: { type: "string" },
        amount: { type: "number" },
        price: { type: "number" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
    };
  }

  static get relationMappings() {}
}

module.exports = Transaction;
