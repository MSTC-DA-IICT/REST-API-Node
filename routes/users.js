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

// delete order - MongoDB version
router.route('/delete/:id').delete((req,res) => {
  Order.findByIdAndDelete(req.params.id)
  .then(() => res.json("Order deleted!"))
  .catch(error => res.status(400).json('Error : ' + error)); // If there is no order with requested id then throw error (Bad request)
})

// update order - MongoDB version
router.route('/update/:id').post((req,res) => {
    
  Order.findById(req.params.id)
  .then(order => {
      order.food = req.body.food; 
      order.customerName = req.body.customerName;
      order.quantity = req.body.quantity;
      
      order.save()
      .then(() => res.json("Order updated!"))
      .catch(error => res.status(200).json('Error : ' + error)); // This indicates that request is succeeded!
  })
  .catch(error => res.status(400).send('Error : ' + error)); // If there is no user with requested id then throw error (Bad request)
})


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
