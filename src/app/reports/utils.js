const store_details = (trans) => {
  let total_store = 0;
  let sdg_amount = 0;
  let total_sales = 0;

  trans.forEach((element) => {
    if (element.type === "بيع") {
      total_sales += element.amount;
      total_store -= element.amount;
      sdg_amount += element.amount * element.price;
    } else if (element.type === "شراء") {
      total_store += element.amount;
      sdg_amount -= element.amount * element.price;
    }
  });

  let data = { total_store, sdg_amount, total_sales };

  return data;
};

module.exports = { store_details };
