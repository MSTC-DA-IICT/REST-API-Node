var express = require("express");
var router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
const Order = require("../models/food.model");
const { verifyUser } = require("../middlewares/validateUser");
const Comments = require("../models/comments.model");

//Get all the orders
var all_orders; // stores all orders
var total_orders = 0; // stores how many orders are there

router.get("/", function (req, res, next) {
  var sort = {};
  sort["_id"] = -1;
  Order.find({})
    .sort(sort)
    .exec(function (err, orders) {
      if (err) {
        // error catching
        return res.status(400).send({
          status: 0,
          message: "Something went wrong!",
        });
      } else {
        if (orders.length) {
          all_orders = orders;
          total_orders = orders.length;
          return res.json({
            status: 1,
            "Total Records": orders.length,
            data: orders,
            message: "All orders are retrived!",
          });
        }
        return res.status(200).send({
          // if there is no such order then throw request succeeded
          status: 1,
          message: "No orders exist!",
        });
      }
    });
});

router.get("/previous", function (req, res, next) {
  var userId = ObjectId(req.cookies.login);
  var sort = {};
  sort["_id"] = -1;
  Order.find({ orderedBy: userId })
    .sort(sort)
    .exec(function (err, orders) {
      if (err) {
        // error catching
        return res.status(400).send({
          status: 0,
          message: "Something went wrong!",
        });
      } else {
        res.render("previous", { orders: orders });
      }
    });
});

//Push an Order
router.post("/", function (req, res, next) {
  var data = req.body;
  //check for empty value
  if (!data.food || !data.customerName || !data.quantity) {
    return res.status(400).json({
      status: 0,
      message: "enter all necessary details",
    });
  }
  data.orderedBy = ObjectId(req.cookies.login);
  var orderData = new Order(data);
  orderData.save(function (err, result) {
    if (err) {
      return res.status(400).json({
        status: 0,
        message: "something went wrong",
      });
    } else {
      res.json({
        status: 1,
        message: "Order Added successfully",
        data: result,
      });
    }
  });
});

//Delete an Order
router.route("/delete/:id").delete(verifyUser, function (req, res) {
  var orderedBy = ObjectId(req.cookies.login);
  var orderId = req.params.id;

  Order.findOneAndDelete({ _id: orderId, user: orderedBy }).exec(function (
    err,
    order
  ) {
    if (err) {
      return res.redirect("../views/login");
    } else {
      res.json({
        status: 200,
        message: "Order deleted successfully",
        data: order,
      });
    }
  });
});

//Update an Order
router.route("/update/:id").post((req, res) => {
  var orderId = req.params.id;
  var data = req.body;
  Order.findOne({ _id: orderId }).exec(function (err, order) {
    if (err) {
      return res.status(400).send({
        status: 0,
        message: "Order Id is not correct",
      });
    } else {
      if (order) {
        if (data.food) {
          order.food = data.food;
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
              message: err,
            });
          } else {
            res.json({
              status: 1,
              message: "Order updated successfully",
              data: result,
            });
          }
        });
      } else {
        return res.json({
          status: 0,
          message: "No Order Stored with this Id ",
        });
      }
    }
  });
});

//Adding comment
router.post("/:id/addcomment", function (req, res, next) {
  var data = req.body;
  //check for empty value
  if (!data.description) {
    return res.status(400).json({
      status: 0,
      message: "enter all necessary details",
    });
  }
  data.userId = ObjectId(req.cookies.login);
  data.orderId = req.params.id;
  var commentData = new Comments(data);
  commentData.save(function (err, result) {
    if (err) {
      return res.status(400).json({
        status: 0,
        message: "something went wrong",
      });
    } else {
      res.json({
        status: 1,
        message: "Comment Added successfully",
        data: result,
      });
    }
  });
});

// Read Comments from the order
router.route("/:id/comments").get((req, res) => {
  var orderId = req.params.id;
  console.log("FETCHING COMMENTS FOR ORDER ", orderId);
  Comments.findOne({ orderId: orderId }).exec(function (err, comment) {
    if (err) {
      return res.status(204).send({
        status: 0,
        message: `No comments found for order id ${orderId}`,
      });
    } else {
      if (comment) {
        res.json({
          status: 1,
          message: `Comments found for order id ${orderId}`,
          data: comment,
        });
      } else {
        return res.status(204).json({
          status: 0,
          message: `No comments found for order id ${orderId}`,
        });
      }
    }
  });
});

// Update Comments from the order
router.route("/:id/comments").put((req, res) => {
  var orderId = req.params.id;
  var data = req.body;
  var userId = ObjectId(req.cookies.login);
  console.log("UPDATING COMMENTS FOR ORDER ", orderId);
  Comments.findOne({ orderId: orderId, _id: data._id }).exec(function (
    err,
    comment
  ) {
    if (err) {
      return res.status(204).send({
        status: 0,
        message: `No comments found for order id ${orderId}`,
      });
    } else {
      if (comment) {
        if(data._id === userId){
          comment.description = data.description;
          comment.save(function (err, result) {
            if (err) {
              console.log("error----------", err);
              return res.status(400).send({
                status: 0,
                message: err,
              });
            } else {
              res.json({
                status: 1,
                message: "Order Comments updated successfully",
                data: result,
              });
            }
          });
        }
        else
        {
          return res.status(401).json({
               status:0,
               message:`You are not authorised user for updating this comment`
          });
        }
      } else {
        return res.status(204).json({
          status: 0,
          message: `No comments found for order id ${orderId}`,
        });
      }
    }
  });
});

// Delete Comments from the order
router.route("/:id/comments/:commentId").delete((req, res) => {
  var orderId = req.params.id;
  var commentId = req.params.commentId;
  console.log("DELETE COMMENTS FOR ORDER ", orderId);
  Comments.findOneAndDelete({ orderId: orderId, _id: commentId }).exec(
    function (err, result) {
      if (err) {
        return res.status(400).send({
          status: 0,
          message: `Failed to delete comment for order id ${orderId} & comment id ${commentId}`,
        });
      } else {
        if (result) {
          res.json({
            status: 1,
            message: "Order Comments deleted successfully",
            data: result,
          });
        } else {
          return res.status(404).json({
            status: 0,
            message: `No comments found for order id ${orderId} & comment id ${commentId}`,
          });
        }
      }
    }
  );
});

module.exports = router;
