const winston = require("winston");
const os = require("os");
require("dotenv").config();
const formatLog = (data) => {
  return {
    enviornment: process.env.ENV,
    serverName : os.hostname(),
    appName    : "ecart",
    logger     : "Elastic",
    platform   : "Node.js",
    message    : data
  };
};
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ]
});
module.exports = { logger, formatLog }