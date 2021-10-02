const mongoose = require("mongoose");

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
  })
);

module.exports = Order;
