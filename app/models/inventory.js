const Promise = require("bluebird"),
  Validator = require("validatorjs"),
  inventory = require("../src/models/inventory")

//TODO
async function insert(data) {
  try {
    let rules = {
      "product_id": "required",
      "account_id": "required",
      "inventory_number": "required",
      "payment_mode": "required",
      "total_price": "required",
      "transact_status": "required",
      "qty": "required"

    };
    const validation = new Validator(data, rules);
    //return error message on anyone of the field is missing
    if (validation.fails()) {
      return Promise.reject({
        message: validation.errors.all()
      });
    }
    //Insert new inventory
    const res = await inventory.insert(data);
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
    const res = await inventory.update(data);
    return Promise.resolve(res);
  } catch (e) {
    return Promise.reject(e);
  }
}

//Get the inventory list
async function get(data) {
  try {
    const res = await inventory.get(data);
    return Promise.resolve(res);
  } catch (e) {
    return Promise.reject(e);
  }
}




module.exports.insert = insert;
module.exports.update = update;
module.exports.get = get;