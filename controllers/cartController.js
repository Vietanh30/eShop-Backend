const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");

class CartController {
  // [GET: api/cart] - Lấy giỏ hàng của người dùng
  getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate({
        path: "orderList.product",
        select: "name price cate image slug", 
        populate: {
          path: "cate",
          select: "name slug", 
        },
      });
    if (cart) {
      res.json(cart.orderList);
    } else {
      res.status(404);
      throw new Error("Cart not found");
    }
  });

  // [PATCH: api/cart/update] - Cập nhật giỏ hàng
  updateCart = asyncHandler(async (req, res) => {
    const { orderList } = req.body;

    // Kiểm tra xem giỏ hàng của user đã tồn tại chưa
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // Tạo giỏ hàng nếu chưa tồn tại
      cart = new Cart({
        user: req.user._id,
        orderList: orderList || [],
      });
    } else {
      // Cập nhật giỏ hàng
      cart.orderList = orderList.map((item) => ({
        product: item.product,
        color: item.color,
        quantity: item.quantity,
      }));
    }

    const updatedCart = await cart.save(); // Lưu giỏ hàng
    res.json(updatedCart.orderList);
  });

  // [DELETE: api/cart/remove-item/:productId] - Xóa sản phẩm khỏi giỏ hàng
  removeItemFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      // Lọc bỏ sản phẩm cần xóa
      cart.orderList = cart.orderList.filter(
        (item) => item.product.toString() !== productId
      );
      const updatedCart = await cart.save();
      res.json(updatedCart.orderList);
    } else {
      res.status(404);
      throw new Error("Cart not found");
    }
  });
}

module.exports = new CartController();
