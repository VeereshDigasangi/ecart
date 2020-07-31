const express = require("express"),
  router = express.Router(),
  order = require("../models/order")

//Add new order
router.post("/", async function (req, res, next) {
  try {
    const r = await order.insert(req.body);
    res.json(r);
  } catch (error) {
    next(error)
  }
});

//TODO
router.put("/", async function (req, res, next) {
  try {
    const r = await order.update(req.body);
    res.json(r);
  } catch (error) {
    next(error)
  }
});

//Get order list
router.get("/", async function (req, res, next) {
  try {
    const r = await order.get(req.query);
    res.json(r);
  } catch (error) {
    next(error)
  }
});

//TODO
router.get("/:id", async function (req, res, next) {
  try {
    const r = await order.get(req.query);
    res.json(r);
  } catch (error) {
    next(error)
  }
});

function routes(app) {
  app.use("/order", router);
}



module.exports = routes;