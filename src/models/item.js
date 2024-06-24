const { format } = require("mysql2");
const { Model } = require("objection");

class Item extends Model {
  static get tableName() {
    return "store_item";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "price", "sell_price", "location"],

      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string" },
        price: { type: "number" },
        sell_price: { type: "number" },
        location: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
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
          from: "store_item.id",
          to: "transactions.item_id",
        },
      },
    };
  }
}

module.exports = Item;
