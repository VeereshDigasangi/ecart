const express = require("express")
  , router = express.Router()


router.get("/health", async function (req, res, next) {
  try {
    res.json({"message": "success"})
  } catch (error) {
    next(error)
  }
});

router.get("/version", async function (req, res, next) {
  try {
    res.json({"version": "1.0.0"})
  } catch (error) {
    next(error)
  }
});


function routes(app) {
  app.use("/", router);
}

module.exports = routes;
