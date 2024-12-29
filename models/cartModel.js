const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartModel = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderList: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        color: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1, // Mặc định là 1
        },
      },
    ],
  },
  {
    timestamps: true, // Thêm thời gian tạo và cập nhật
  }
);

module.exports = mongoose.model("Cart", cartModel);
