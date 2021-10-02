var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

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
