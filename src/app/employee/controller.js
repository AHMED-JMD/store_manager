const Employee = require("../../models/employee");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      let employees = await Employee.query().orderBy("createdAt");

      res.json(employees);
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) {
        let err = new Error("id not found");
        err.status = 400;
        next(err);
      } else {
        //send emp from db
        let employee = await Employee.query().findById(id);

        res.json(employee);
      }
    } catch (error) {
      next(error);
    }
  },
  add: async (req, res, next) => {
    try {
      const { name, phone_num, account } = req.body;

      if (!name || !phone_num || !account) {
        let err = new Error("الرجاء ادخال الاسم و رقم الهاتف");
        err.status = 400;
        next(err);
      } else {
        //check phone Num
        let emp = await Employee.query().select().where("phone_num", phone_num);

        if (emp.length !== 0) {
          let err = new Error("رقم الهاتف موجود مسبقا");
          err.status = 400;
          next(err);
        } else {
          //insert to db
          await Employee.query().insert({
            name,
            phone_num,
            account: parseFloat(account),
          });

          res.json("emp added successfully");
        }
      }
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, phone_num, account } = req.body;

      if (!(id && name && phone_num && account)) {
        let err = new Error("الرجاء ادخال جميع الحقول");
        err.status = 400;
        next(err);
      } else {
        //update db
        await Employee.query()
          .patch({ name, phone_num, account: parseFloat(account) })
          .where("id", id);

        res.json("updated successfully");
      }
    } catch (error) {
      next(error);
    }
  },
  deleteEmp: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) {
        let err = new Error("invalid id");
        err.status = 400;
        next(er);
      } else {
        //delete from db
        await Employee.query().deleteById(id);

        res.json("deleted successfully");
      }
    } catch (error) {
      next(error);
    }
  },
};
