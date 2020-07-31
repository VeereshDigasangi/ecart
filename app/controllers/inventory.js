const express = require("express"),
  router = express.Router(),
  inventory = require("../models/inventory")

//TODO
router.post("/", async function (req, res, next) {
  try {
    const r = await inventory.insert(req.body);
    res.json(r);
  } catch (error) {
    next(error)
  }
});

//TODO
router.put("/", async function (req, res, next) {
  try {
    const r = await inventory.update(req.body);
    res.json(r);
  } catch (error) {
    next(error)
  }
});

//Get inventory list
router.get("/", async function (req, res, next) {
  try {
    const r = await inventory.get(req.query);
    res.json(r);
  } catch (error) {
    next(error)
  }
});

//TODO
router.get("/:id", async function (req, res, next) {
  try {
    const r = await inventory.get(req.query);
    res.json(r);
  } catch (error) {
    next(error)
  }
});

function routes(app) {
  app.use("/inventory", router);
}



module.exports = routes;