const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
    },
  }, {
    toJSON: { getters: true }
  })
);

module.exports = User;
