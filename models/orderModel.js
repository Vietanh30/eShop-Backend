const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderModel = new Schema(
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
          default: "",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Middleware để tính toán totalPrice trước khi lưu
orderModel.pre("save", async function (next) {
  if (this.isModified("orderList")) {
    const Product = mongoose.model("Product");

    let total = 0;

    for (const item of this.orderList) {
      const product = await Product.findById(item.product);
      if (product) {
        // Tính giá sau giảm giá 10%
        const discountedPrice = product.price - product.price * product.offer / 100;
        total += discountedPrice * item.quantity;
      }
    }

    this.totalPrice = total; // Gán totalPrice với tổng đã tính
  }
  next();
});

module.exports = mongoose.model("Order", orderModel);
