var express = require("express");
var router = express.Router();
const Order = require("../models/food.model");

//Get all the orders
var all_orders; // stores all orders
var total_orders = 0; // stores how many orders are there

router.get("/", function (req, res, next) {
  var sort = {};
  sort['_id'] = -1; 
  Order.find({}).sort(sort).exec( function(err, orders){
    if(err){  // error catching
      return res.status(400).send({
        status: 0,
        message: "Something went wrong!"
      })
    } else{
      if (orders.length) {
        all_orders = orders;
        total_orders = orders.length;
        return res.json({
          status: 1,
          "Total Records": orders.length,
          data: orders,
          message: "All orders are retrived!"
        });
      }
      return res.status(200).send({ // if there is no such order then throw request succeeded
        status: 1,
        message: 'No orders exist!'
      })
    }
  })
})

//Push an Order
router.post("/", function (req, res, next) {
  var data = req.body;
  //check for empty value
  if (!data.food || !data.customerName || !data.quantity) {
    return res.status(400).json({
      status: 0,
      message: 'enter all necessary details'
    })
  }
  var orderData = new Order(data);
  orderData.save(function(err, result){
    if(err){
      return res.status(400).json({
        status: 0,
        message: 'something went wrong'
      })
    } else{
      res.json({
        status: 1,
        "message": "Order Added successfully",
        data: result
    });
    }
  })
})

//Delete an Order
router.route('/delete/:id').delete((req,res) => {
  var orderId = req.params.id;
  Order.findOneAndDelete({_id: orderId}).exec(function(err, order){
    if (err) {
      return res.status(400).send({
          status: 0,
          message: 'something went wrong'
      })
    } else{
      res.json({
        status: 1,
        message: "Order deleted successfully",
        "data": order
      })
    }
  })
})

//Update an Order
router.route('/update/:id').post((req,res) => {   
  var orderId = req.params.id;
  var data = req.body;
  Order.findOne({_id: orderId}).exec(function(err, order){
    if (err) {
      return res.status(400).send({
          status: 0,
          message: 'Order Id is not correct'
      })
    } else{
      if(order){
        if (data.food) {
          order.food = data.food
        }
        if (data.customerName) {
          order.customerName = data.customerName;
        }
        if (data.quantity) {
          order.quantity = data.quantity;
        }
        order.save(function (err, result) {
          if (err) {
            console.log("error----------", err);
            return res.status(400).send({
              status: 0,
              message: err
            })
          } else{
            res.json({
              status: 1,
              "message": "Order updated successfully",
              data: result
            });            
          }
        })
      } else {
        return res.json({
          status: 0,
          message: 'No Order Stored with this Id '
        })
      }
    }
  })
})

module.exports = router;
