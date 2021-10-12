const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Comments = mongoose.model(
  "Comments",
  new mongoose.Schema({
    description: {
      type: String,
      required: true,
    },
    orderId: {
      type: ObjectId,
      required: true,
    },
    userId: {
      type: ObjectId,
      required: true,
    },
  })
);

module.exports = Comments;
