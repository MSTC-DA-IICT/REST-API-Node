var express = require("express");
var router = express.Router();
//variable to store data
const user = [];

var users; // will store all users

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
