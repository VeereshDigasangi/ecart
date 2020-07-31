/*eslint consistent-return: "off"*/

const express = require("express")
  , config = require("./config/config")
  , ht = require("http");
let app = express();
ht.Server(app);

require("./config/express")(app, config);
require("dotenv").config();

module.exports = app;
