const _ = require("lodash"),
  Promise = require("bluebird"),
  db = require("../../util/db")

require("dotenv").config();

// TODO
async function insert(data) {
  try {
    const product_id = _.get(data, "product_id");
    const account_id = _.get(data, "account_id");
    const order_number = _.get(data, "order_number"); //This is the unique order number shared with client
    const payment_mode = _.get(data, "payment_mode");
    const total_price = _.get(data, "total_price");
    const transact_status = _.get(data, "transact_status");
    const qty = _.get(data, "qty");

    if (qty > 0 && transact_status === "success") {
      //TODO make a sigle object transfer the data
      //TODO optmize the insert logic
      await db.insert("order", ["product_id", "account_id", "order_number", "payment_mode", "total_price", "transact_status", "qty"], [product_id, account_id, qty, order_number, payment_mode, total_price, transact_status, qty]);
      //Update Inventory with product qty
      await db.update(qty, product_id, "remove")
    }

    return Promise.resolve({
      "message": "inserted successfully"
    });
  } catch (e) {
    return Promise.reject(e);
  }
}

// TODO
async function update(qty,product_id,operation) {
  try {
    let query=""
    if (operation=="remove")
      query="update inventory set stock_level=stock_level-$1 where id=$2"
    else
      query="update inventory set stock_level=stock_level+$1 where id=$2"
   
    let count=await db.executeQuery(query,[qty,product_id])
    if (count)
      return Promise.resolve({
        "message.defaultTo(knex.fn.now())": "updated successfully"
      });
    else
      return Promise.reject({
        message: "ID not found"
      })
  } catch (e) {
    return Promise.reject(e);
  }
}

// Get the list of inventory
async function get(data) {
  try {
    let query = "Select * from public.inventory";
    let res = await db.executeQuery(query);
    return Promise.resolve(res);
  } catch (e) {
    return Promise.reject(e);
  }
}
  



module.exports.insert = insert;
module.exports.update = update;
module.exports.get = get;
