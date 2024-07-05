const Transaction = require("../../models/transaction");
const Item = require("../../models/item");
const Account = require("../../models/employee");

module.exports = {
  add: async (req, res, next) => {
    try {
      const { item_id, emp_id, type, amount, price, date } = req.body;

      if (!(item_id && emp_id && type && amount && price)) {
        let err = new Error("الرجاء ادخال جميع الحقول");
        err.status = 400;
        next(err);
      } else {
        //find employee and item by ids
        let item = await Item.query().findById(item_id);
        let emp = await Account.query().findById(emp_id);
        //add to db
        await Transaction.query().insert({
          item_id,
          emp_id,
          item_name: item.name,
          emp_name: emp.name,
          type,
          amount,
          price,
        });

        res.json("added successfully");
      }
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      let trans = await Transaction.query().orderBy("createdAt");

      res.json(trans);
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) {
        let err = new Error("invalid id");
        err.status = 400;
        next(err);
      } else {
        //find from db
        let tran = await Transaction.query().findById(id);

        res.json(tran);
      }
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { item_id, emp_id, item_name, emp_name, type, amount, price } =
        req.body;

      if (
        !(
          item_id &&
          emp_id &&
          item_name &&
          emp_name &&
          type &&
          amount &&
          price &&
          id
        )
      ) {
        let err = new Error("الرجاء ادخال جميع الحقول");
        err.status = 400;
        next(err);
      } else {
        //update db
        await Transaction.query().findById(id).patch({
          item_id,
          emp_id,
          item_name,
          emp_name,
          type,
          amount,
          price,
        });

        res.json("updated successfully");
      }
    } catch (error) {
      next(error);
    }
  },
  deleteTran: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) {
        let err = new Error("invalid id");
        err.status = 400;
        next(err);
      } else {
        //find from db
        let tran = await Transaction.query().deleteById(id);

        res.json("deleted successsfully");
      }
    } catch (error) {
      next(error);
    }
  },
};
