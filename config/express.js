const express = require("express"),
  glob = require("glob"),
  logger = require("morgan"),
  bodyParser = require("body-parser"),
  compress = require("compression"),
  addReuestId = require("express-request-id")(),
  fileUpload = require("express-fileupload"),
  winston = require("./winston"),
  HttpError = require("../app/errors/HttpError"),
  cors = require("cors")

module.exports = function (app, config) {
  app.use(addReuestId);
  const env = process.env.NODE_ENV || "development";
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = (env == "development");


  app.use(cors())
  app.set("views", config.root + "/app/views");
  app.set("view engine", "jade");
  app.set("trust proxy", 1);
  app.use(fileUpload({
    createParentPath: true
  }));

  app.use(logger("dev"));
  app.use(logger("combined", {
    stream: winston.stream
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.json({
    type: "application/*+json"
  }));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(compress());
  app.use(express.static(config.root + "/public"));

  glob.sync(config.root + "/app/controllers/**/*.js").forEach(function (controller) {
    //eslint-disable-next-line import/no-dynamic-require
    require(controller)(app); //eslint-disable-line  global-require
  });

  /// catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  });


  // eslint-disable-next-line no-unused-vars
  app.use(async function (err, req, res, next) {
    console.log(new HttpError(err));
    res.locals.message = err.message;
    res.locals.error = err;
    // render the error page
    res.status(400).send({
      title  : err.Title || "error",
      code   : err.error_code || 0,
      message: err.message,
      data   : err.data || null
    });
  });
};