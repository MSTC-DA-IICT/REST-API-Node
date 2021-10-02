var express = require("express");
var router = express.Router();
//variable to store data
const user = [];

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/", function (req, res, next) {
  const { food, customerName, foodQuantiy } = req.body;
  //check for empty value
  if (!food || !customerName || !foodQuantiy) {
    return res.send("Enter all details");
  }
  user.push({ id: user.length, food, customerName, foodQuantiy });
  console.log(user);
  return res.send("Order Taken");
});

module.exports = router;
