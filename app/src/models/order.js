const _ = require("lodash"),
  Promise = require("bluebird"),
  db = require("../../util/db"),
  invenotry =require("./inventory")


require("dotenv").config();

//insert new record into the database
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
      await db.insert("public.order", ["inventory_id", "account_id", "order_number", "payment_mode", "total_price", "transact_status", "qty"], [product_id, account_id, order_number, payment_mode, total_price, transact_status, qty]);
      //Update Inventory with product qty
      await invenotry.update(qty, product_id, "remove");
    }

    return Promise.resolve({
      "message": "inserted successfully"
    });
  } catch (e) {
    return Promise.reject(e);
  }
}
//TODO
async function update(data) {
  try {
    if (data.assemble_cost)
      var assemble_time = _.get(data, "assemble_time") || 0;
    if (data.assemble_time)
      var assemble_cost = _.get(data, "assemble_cost") || 0;

    data = _.omit(data, ["assemble_time", "assemble_cost"])
    let count = await db.update(data, "product");

    if (assemble_cost || assemble_time)
      await db.insert("product_derived", ["product_id", "assemble_time", "assemble_cost"], [_.get(data, "id"), assemble_time, assemble_cost])
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


//Get order list 
async function get(data) {
  try {
    let query = "Select * from public.order";
    let res = await db.executeQuery(query);
    return Promise.resolve(res);
  } catch (e) {
    return Promise.reject(e);
  }
}



module.exports.insert = insert;
module.exports.update = update;
module.exports.get = get;
