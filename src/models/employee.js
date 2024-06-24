const { Model } = require("objection");

class Employee extends Model {
  static get tableName() {
    return "employee";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],

      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string" },
        email: { type: ["string", "null"], format: "email" },
        createdAt: { type: "string", format: "date-time" },
        updatetAt: { type: "string", format: "date-time" },
      },
    };
  }

  static get relationMappings() {
    const Transaction = require("./transaction");

    return {
      transactions: {
        relation: Model.HasManyRelation,
        modelClass: Transaction,
        join: {
          from: "employee.id",
          to: "transactions.emp_id",
        },
      },
    };
  }
}

module.exports = Employee;
