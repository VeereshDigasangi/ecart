const Promise = require("bluebird"),
  Validator = require("validatorjs"),
  order = require("../src/models/order")

//Validate the required field exist in the request body
async function insert(data) {
  try {
    let rules = {
      "product_id"     : "required",
      "account_id"     : "required",
      "order_number"   : "required",
      "payment_mode"   : "required",
      "total_price"    : "required",
      "transact_status": "required",
      "qty"            : "required"

    };
    const validation = new Validator(data, rules);
    //return error message on anyone of the field is missing
    if (validation.fails()) {
      return Promise.reject({
        message: validation.errors.all()
      });
    }
    //Insert new order
    const res = await order.insert(data);
    return Promise.resolve(res);
  } catch (e) {
    return Promise.reject(e);
  }
}

//TODO
async function update(data) {
  try {
    let rules = {
      "id": "required",
    };
    const validation = new Validator(data, rules);
    if (validation.fails()) {
      return Promise.reject({
        message: validation.errors.all()
      });
    }
    const res = await order.update(data);
    return Promise.resolve(res);
  } catch (e) {
    return Promise.reject(e);
  }
}

//Get the order list
async function get(data) {
  try {
    const res = await order.get(data);
    return Promise.resolve(res);
  } catch (e) {
    return Promise.reject(e);
  }
}




module.exports.insert = insert;
module.exports.update = update;
module.exports.get = get;