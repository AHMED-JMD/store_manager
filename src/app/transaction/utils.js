const totalCount = (trans) => {
  let inc_total = 0;
  let out_total = 0;

  trans.forEach((element) => {
    if (element.type === "بيع") {
      inc_total += element.amount * element.price;
    } else {
      out_total += element.amount * element.price;
    }
  });

  let data = { totalIncome: inc_total, totalOutcome: out_total };
  return data;
};

module.exports = { totalCount };
