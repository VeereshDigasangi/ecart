const Promise = require("bluebird")
  , _ = require("lodash")
  , moment = require("moment")
  , db = require("../../config/postgres")
  , logger = require("../../config/winston").logger
  , format = require("../../config/winston").formatLog

//build the query and insert into specified table
async function insert(table, params, data) {
  try {
    var i = 1;
    var litteral = params.map(() => "$" + i++);
    var buildQuery = "insert into " + table + " (" + params.toString() + ") values(" + litteral.toString() + ")returning id";

    console.log("-------\n",buildQuery);
    
    let id = await db.query(buildQuery, data);
    id = _.get(id, "rows[0].id")
    return Promise.resolve(id);
  } catch (error) {
    console.log(error);
    
    logger.error(format(error))
    return Promise.reject({ message: "insert operation failed, " + error.message })
  }
}
//update the table with the specified id to specified columns.
async function update(data, table) {
  try {
    const id = _.get(data, "id");
    const updated_at = moment(Date.now()).format();
    data = _.omit(data, ["id"]);
    let columns = [];
    let params = [id, updated_at];
    let i = 3;
    for (var key in data) {
      columns.push(`${key}=$${i}`);
      params.push(data[key]);
      i++;
    }
    let query = `update ${table} set updated_at=$2,${columns.join(",")} where id=$1`;
    
    let count = await db.query(query, params);
    count = _.get(count, "rowCount");
    return Promise.resolve(count);
  } catch (error) {
    logger.error(format(error))
    return Promise.reject({ message: "updated operation failed, " + error.message })
  }
}

//Run the passed query 
//Return the result
async function executeQuery(query,params) {
  try {
    let res = await db.query(query, params);
    return Promise.resolve(res.rows);
  } catch (error) {
    logger.error(format(error))
    return Promise.reject({ message: "get operation failed, " + error.message })
  }
}

module.exports.insert = insert;
module.exports.update = update;
module.exports.executeQuery = executeQuery



