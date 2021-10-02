var express = require("express");
var router = express.Router();
const Order = require("../models/food.model");

var users; // will store all users

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

// delete order
router.route('/delete/:id').delete((req,res) => {
  users.foreach((user,idx) =>{ // loop over all orders and find order with given id
    if(user.id == req.params.id){
      users.remove(order[idx]);
      res.json("Order deleted!")
    }
  });
})



// update order
router.route('/update/:id').post((req,res) => {
    
  users.foreach((user,idx) =>{ // loop over all orders and find order with given id
    if(user.id == req.params.id){
      // merge object with requested updation
      users[idx] = {
        ...users[idx],
        ...(req.body)
      }
      res.json("Order updated!")
    }
  });
})
module.exports = router;
