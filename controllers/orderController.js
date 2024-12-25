const Product = require("../models/productModel.js");
const Order = require("../models/orderModel.js");
const asyncHandler = require("express-async-handler");

class OrderController {
  //  [ GET - ROUTE: api/order/]
  getOrder = asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id });
    res.json(order);
  });

  //  [ GET - ROUTE: api/order/all]
  getAllOrder = asyncHandler(async (req, res) => {
    const order = await Order.find({});
    res.json(order);
  });

  //  [ POST - ROUTE: api/order/create]
  createOrder = asyncHandler(async (req, res) => {
    const { orderList, paymentMethod, price } = req.body;

    const newOrder = await Order.create({
      user: req.user._id,
      orderList: JSON.parse(orderList),
      paymentMethod,
      paymentStatus: "pending",
      price,
    });
    res.json(newOrder);
  });

  //  [ PATCH - ROUTE: api/order/:id]
  updateStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (order) {
      order.paymentStatus = status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order does not exist!");
    }
  });
}

module.exports = new OrderController();
