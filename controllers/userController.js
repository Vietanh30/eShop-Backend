const User = require("../models/userModel");
const Cart = require("../models/cartModel");

const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const Token = require("../models/resetTokenModel");

class UserController {
  //  [ POST - ROUTE: api/user/register ]
  registerUser = asyncHandler(async (req, res) => {
    const { name, password, phoneNumber, gender, email } = req.body;
    const user = await User.findOne({ $or: [{ email }, { name }] });
    if (!name || !password || !phoneNumber || !gender || !email) {
      res.status(404);
      throw new Error("Vui lòng điền đầy đủ các trường!");
    }

    if (!user) {
      var salt = await bcrypt.genSalt(10);
      var hashPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create({
        name,
        email,
        phoneNumber,
        gender,
        password: hashPassword,
        roleUser: "customer",
      });
      if (newUser) {
        await Cart.create({ user: newUser._id, orderList: [] });
        res.json({
          _id: newUser._id,
          name,
          email,
          name,
          phoneNumber,
          gender,
          newUser: newUser.roleUser,
        });
      } else {
        res.status(501);
        throw new Error("Fail to resister new user!");
      }
    } else {
      res.status(404);
      throw new Error("Người dùng đã tồn tại!");
    }
  });

  //  [ POST - ROUTE: api/user/auth ]
  authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        roleUser: user.roleUser,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid UserName or Password");
    }
  });

  //  [ GET - ROUTE: api/user ]
  getUserProfile = asyncHandler(async (req, res) => {
    var user = await User.findById(req.user._id);

    
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        userName: user.userName,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        roleUser: user.roleUser,
      });
    } else {
      res.status(404);
      throw new Error("User does not exist!");
    }
  });

  //  [ GET - ROUTE: api/user/all ]
  getAllUserProfile = asyncHandler(async (req, res) => {
    const user = await User.find({});
    res.json(user);
  });

  //  [PATCH - ROUTE: api/user/update]
  updateUser = asyncHandler(async (req, res) => {
    var user = await User.findById(req.user._id);
    if (user) {
      if (req.body.password) {
        var salt = await bcrypt.genSalt(10);
        var hashPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashPassword;
      }
      var updateUser = await User.findOneAndUpdate(
        { _id: user._id },
        {
          name: req.body.name || user.name,
          userName: user.userName,
          email: req.body.email || user.email,
          phoneNumber: req.body.phoneNumber || user.phoneNumber,
          gender: req.body.gender || user.gender,
          roleUser: req.body.roleUser || user.roleUser,
          password: hashPassword,
          token: generateToken(user._id),
        },
        {
          new: true,
        }
      );
      res.json(updateUser);
    } else {
      res.status(404);
      throw new Error("User does not exist!");
    }
  });

  //  [ PATCH - ROUTE: api/user/role/:id]
  updateRole = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const user = await User.findById(req.params.id);
    if (user) {
      user.roleUser = status;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404);
      throw new Error("User does not exist!");
    }
  });
}

module.exports = new UserController();
