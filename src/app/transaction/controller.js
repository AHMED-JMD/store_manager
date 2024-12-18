const Transaction = require("../../models/transaction");
const Item = require("../../models/item");
const Account = require("../../models/employee");
const { totalCount } = require("./utils");
const knex = require("knex");

module.exports = {
  add: async (req, res, next) => {
    try {
      const { item_id, emp_id, type, amount, price, date, comment } = req.body;

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
          amount: parseFloat(amount),
          price: parseFloat(price),
          date,
          comment,
        });

        //update account
        if (type === "بيع") {
          await Account.query()
            .findById(emp_id)
            .patch({
              account: emp.account + parseFloat(amount * price),
            });
        } else {
          await Account.query()
            .findById(emp_id)
            .patch({
              account: emp.account - parseFloat(amount * price),
            });
        }

        res.json("added successfully");
      }
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const { date } = req.query;

      let trans = await Transaction.query().orderBy("createdAt", "DESC");

      //get total incomes and outcomes
      const totals = totalCount(trans);

      res.json({ trans, totals });
    } catch (error) {
      next(error);
    }
  },
  filter: async (req, res, next) => {
    try {
      const { start_date, end_date, item_id, emp_id } = req.body;

      //get transactions
      let trans;
      // trans = await knex("transactions").select(
      //   knex.raw(
      //     `SELECT *
      //     FROM tbl
      //     WHERE date <= IF(? IS NOT NULL, ?, '2999-12-31')
      //     AND date >= IF(? IS NOT NULL, ?, '1000-01-01')
      //     AND (? IS NULL OR col1 = ?)
      //     AND (? IS NULL OR col2 = ?)
      //     AND (? IS NULL OR col3 = ?)
      //     AND (? IS NULL OR col4 = ?);`
      //   )
      // );
      if (item_id && emp_id) {
        trans = await Transaction.query()
          .where("item_id", item_id)
          .where("emp_id", emp_id)
          .whereBetween("date", [start_date, end_date]);
      }

      //get total incomes and outcomes
      const totals = totalCount(trans);

      res.json({ trans, totals });
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
        let tran = await Transaction.query().findById(id);
        let emp = await Account.query().findById(tran.empId);

        //update account
        await Account.query()
          .findById(tran.empId)
          .patch({
            account: emp.account - tran.amount * tran.price,
          });

        //delete tran
        await Transaction.query().deleteById(id);

        res.json("deleted successsfully");
      }
    } catch (error) {
      next(error);
    }
  },
};
