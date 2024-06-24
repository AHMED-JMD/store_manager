const Item = require("../../models/item");

module.exports = {
  add: async (req, res, next) => {
    try {
      const { name, price, sell_price, location } = req.body;

      //req validation
      if (!(name && price && sell_price && location)) {
        let err = new Error("اضف جميع الحقول");
        err.status = 400;
        next(err);
      }

      //check item exists with (name)
      let item = await Item.query().select().where("name", name);
      if (item.length !== 0) {
        let err = new Error("تمت اضافة الصنف مسبقا");
        err.status = 400;
        next(err);
      } else {
        //insert to db
        await Item.query().insert({
          name,
          price: parseFloat(price),
          sell_price: parseFloat(sell_price),
          location,
        });

        res.json("successfully added to db");
      }
    } catch (err) {
      next(err);
    }
  },
  getAll: async (req, res, next) => {
    try {
      let items = await Item.query().orderBy("createdAt");

      res.json(items);
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      let { id } = req.params;

      if (!id) {
        let err = new Error("please provide id");
        err.status = 400;
        next(err);
      }

      //call db
      let item = await Item.query().findById(id);

      res.json(item);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, price, sell_price, location } = req.body;

      //await db
      await Item.query()
        .findById(id)
        .patch({
          name,
          price: parseFloat(price),
          sell_price: parseFloat(sell_price),
          location,
        });

      res.json("updated successfully");
    } catch (error) {
      next(error);
    }
  },
  deleteItem: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) {
        let err = new Error("please provide id");
        err.status = 400;
        next(err);
      }
      //delete
      await Item.query().deleteById(id);

      res.json("deleted successfully");
    } catch (error) {
      next(error);
    }
  },
};
