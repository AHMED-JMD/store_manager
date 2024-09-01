const Transaction = require("../../models/transaction");
const Item = require("../../models/item");
const { store_details } = require("./utils");

module.exports = {
  homeReport: async (req, res, next) => {
    try {
      const { item_name } = req.body;
      let trans = await Transaction.query().where("item_name", item_name);
      let item = await Item.query().where("name", item_name);

      let data = store_details(trans);

      let sdg_amount = data.total_store * item[0].sellPrice;

      //send response
      res.json({
        total_sales: data.total_sales,
        total_store: data.total_store,
        sdg_amount,
        sdg_profit: data.sdg_amount + sdg_amount,
      });
    } catch (error) {
      next(error);
    }
  },
};
//total_sales = response.data['total_sales'];
// total_store = response.data['total_store'];
// sdg_amount = total_store * 790000;
// uae_amount = total_store * 725;
// sdg_profit = response.data['sdg_amount'] + sdg_amount;
// uae_profit = (response.data['sdg_amount'] / 725) + uae_amount;
