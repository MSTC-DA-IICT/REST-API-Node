const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    food: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    orderedBy: {
      type: ObjectId, //linking userdb to orderdb
      ref: "User",
    },
  })
);

module.exports = Order;
