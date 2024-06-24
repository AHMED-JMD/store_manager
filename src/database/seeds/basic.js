/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("transactions").del();
  await knex("employee").del();
  await knex("store_item").del();

  await knex("store_item").insert([
    {
      id: "2e028584-29b9-4dcc-ac23-887450df51c0",
      name: "الفلير",
      price: 9800,
      sell_price: 11200,
      location: "السودان",
    },
    {
      id: "2e028584-29b9-4dcc-ac23-887450df51c1",
      name: "الدقيق",
      price: 21000,
      sell_price: 22500,
      location: "السودان",
    },
  ]);

  await knex("employee").insert([
    {
      id: "2e028584-29b9-4dcc-ac23-887450df51c2",
      name: "محمد الفاضل",
      phone_num: "0912345309",
      account: 1750000,
    },
    {
      id: "2e028584-29b9-4dcc-ac23-887450df51c3",
      name: "عبدالله عثمان",
      phone_num: "0912345308",
      account: 2150000,
    },
    {
      id: "2e028584-29b9-4dcc-ac23-887450df51c4",
      name: "عبدالرحمن الطيب",
      phone_num: "0912345309",
      account: 700000,
    },
  ]);

  await knex("transactions").insert([
    {
      id: "2e028584-29b9-4dcc-ac23-887450df51c5",
      item_id: "2e028584-29b9-4dcc-ac23-887450df51c0",
      emp_id: "2e028584-29b9-4dcc-ac23-887450df51c2",
      item_name: "الفلير",
      emp_name: "محمد الفاضل",
      type: "بيع",
      price: 11200,
      amount: 8,
    },
    {
      id: "2e028584-29b9-4dcc-ac23-887450df51c6",
      item_id: "2e028584-29b9-4dcc-ac23-887450df51c0",
      emp_id: "2e028584-29b9-4dcc-ac23-887450df51c2",
      item_name: "الفلير",
      emp_name: "محمد الفاضل",
      type: "بيع",
      price: 11220,
      amount: 6,
    },
    {
      id: "2e028584-29b9-4dcc-ac23-887450df51c7",
      item_id: "2e028584-29b9-4dcc-ac23-887450df51c0",
      emp_id: "2e028584-29b9-4dcc-ac23-887450df51c3",
      item_name: "الفلير",
      emp_name: "عبدالله عثمان",
      type: "شراء",
      price: 9850,
      amount: 5,
    },
    {
      id: "2e028584-29b9-4dcc-ac23-887450df51c8",
      item_id: "2e028584-29b9-4dcc-ac23-887450df51c1",
      emp_id: "2e028584-29b9-4dcc-ac23-887450df51c3",
      item_name: "الدقيق",
      emp_name: "عبدالرحمن الطيب",
      type: "بيع",
      price: 22100,
      amount: 100,
    },
  ]);
};
