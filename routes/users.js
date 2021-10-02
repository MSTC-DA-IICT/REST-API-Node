var express = require("express");
var router = express.Router();
const Order = require("../models/food.model");

/* GET users listing. */
//Get all the orders
router.get("/", function (req, res, next) {
  const allOrder = Order.find({})
    .then((order) => {
      res.json({ order });
    })
    .catch((err) => {
      console.log(err);
    });
});
//Add an Order
router.post("/", function (req, res, next) {
  const { food, customerName, foodQuantiy } = req.body;
  //check for empty value
  if (!food || !customerName || !foodQuantiy) {
    return res.send("Enter all details");
  }
  const order = new Order({
    food: food,
    customerName: customerName,
    quantity: foodQuantiy,
  })
    .save()
    .then((myorder) => {
      res.json({ myorder });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
