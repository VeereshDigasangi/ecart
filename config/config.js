require("dotenv").config();
const path = require("path"),
  rootPath = path.normalize(__dirname + "/.."),
  env = process.env.NODE_ENV || process.env.ENV || "development",
  config = {
    development: {
      root: rootPath,
      app : {
        name: "ecart_dev"
      },
      db: {
        host    : process.env.PGHOST || "127.0.0.1",
        username: process.env.PGUSER || "postgres",
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE || "ecart",
        port    : process.env.PGPORT || "5432",
        dialect : "postgres",
        logging : false
      }
    },
    test: {
      root: rootPath,
      app : {
        name: "ecart_test"
      },
      db: {
        host    : "postgres",
        username: "runner",
        database: "ecart",
        port    : process.env.PGPORT || "5432",
        dialect : "postgres",
        logging : false
      }
    }
  };
module.exports = config[env];