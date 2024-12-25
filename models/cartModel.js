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
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        name: {
          type: String,
          required: true,
          default: "",
        },
        image: {
          type: String,
          required: true,
          default: "",
        },
        color: {
          type: String,
          required: true,
          default: "",
        },
        price: {
          type: String,
          required: true,
          default: 0,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartModel);
