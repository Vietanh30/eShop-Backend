const Product = require("../models/productModel.js");
const Order = require("../models/orderModel.js");
const asyncHandler = require("express-async-handler");

class OrderController {
  // [ GET - ROUTE: api/order/ ] - Lấy đơn hàng của người dùng hiện tại
  getOrder = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).populate({
      path: "orderList.product",
      select: "name price cate image slug", // Các trường cần lấy trong Product
      populate: {
        path: "cate",
        select: "name slug", // Các trường cần lấy trong Category
      },
    });

    res.status(200).json(orders);
  });

  // [ GET - ROUTE: api/order/all ] - Lấy tất cả đơn hàng (dành cho Admin)
  getAllOrder = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate({
      path: "orderList.product",
      select: "name price cate image slug", // Các trường cần lấy trong Product
      populate: {
        path: "cate",
        select: "name slug", // Các trường cần lấy trong Category
      },
    });

    res.status(200).json(orders);
  });

  // [ POST - ROUTE: api/order/create ] - Tạo đơn hàng mới
  createOrder = asyncHandler(async (req, res) => {
    const { orderList, paymentMethod } = req.body;

    if (!orderList || orderList.length === 0) {
      return res.status(400).json({ message: "Order list cannot be empty" });
    }

    const newOrder = await Order.create({
      user: req.user._id,
      orderList,
      paymentMethod,
    });

    res.status(201).json(newOrder);
  });

  // [ PATCH - ROUTE: api/order/:id ] - Cập nhật trạng thái thanh toán
  updateStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order does not exist!" });
    }

    order.paymentStatus = status || order.paymentStatus;

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  });
}

module.exports = new OrderController();
