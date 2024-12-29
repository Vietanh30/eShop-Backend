const asyncHandler = require("express-async-handler");
const categoriesModel = require("../models/categoriesModel.js");

class CategoryController {
  //  [ GET - ROUTE: api/cart]
  getAll = asyncHandler(async (req, res) => {
    const categories = await categoriesModel.find();
    res.json(categories);
  });

}

module.exports = new CategoryController();
