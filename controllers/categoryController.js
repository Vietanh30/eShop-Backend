const asyncHandler = require("express-async-handler");
const categoriesModel = require("../models/categoriesModel.js");
const productsModel = require("../models/productModel.js"); // Giả sử bạn có model cho sản phẩm

class CategoryController {
  //  [ GET - ROUTE: api/cate]
  getAll = asyncHandler(async (req, res) => {
    const categories = await categoriesModel.find();
    res.json(categories);
  });

  //  [ GET - ROUTE: api/cate/:id]
  getCateById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await categoriesModel.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Danh mục không tồn tại." });
    }

    res.json(category);
  });

  //  [ GET - ROUTE: api/cate/:slug]
  getProductBySlugCate = asyncHandler(async (req, res) => {
    const { slug } = req.params; // Lấy slug từ tham số đường dẫn

    // Tìm danh mục theo slug
    const category = await categoriesModel.findOne({ slug: slug });

    if (!category) {
      return res.status(404).json({ message: "Danh mục không tồn tại." });
    }

    // Tìm sản phẩm thuộc danh mục
    const products = await productsModel.find({ cate: category._id }); // Giả sử sản phẩm có trường categoryId

    res.json(products); // Trả về danh sách sản phẩm
  });
}

module.exports = new CategoryController();
