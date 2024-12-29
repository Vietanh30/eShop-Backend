const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

class ProductController {
  // [GET: api/product] - Lấy tất cả sản phẩm
  getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().populate("cate", "name slug");
    res.json(products);
  });

  // [GET: api/product/:slug] - Lấy sản phẩm theo slug
  getProductBySlug = asyncHandler(async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug }).populate(
      "cate",
      "name slug"
    );
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product does not exist!");
    }
  });

  // [GET: api/product/:id] - Lấy sản phẩm theo ID
  getProductByID = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
      "cate",
      "name slug"
    );
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product does not exist!");
    }
  });

  // [PATCH: api/product/:id] - Cập nhật sản phẩm
  updateProduct = asyncHandler(async (req, res) => {
    const { name, ...rest } = req.body;

    const generateSlug = (str) =>
      str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

    const pro = await Product.findById(req.params.id);

    if (pro) {
      let updatedFields = { ...rest };
      if (name) {
        updatedFields.name = name;
        updatedFields.slug = generateSlug(name); // Tự động cập nhật slug
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updatedFields,
        { new: true }
      );

      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product does not exist");
    }
  });

  // [POST: api/product] - Tạo sản phẩm mới
  createProduct = asyncHandler(async (req, res) => {
    const { name, cate, color, price, image, offer, configDesc, description, review, rating } =
      req.body;

    const generateSlug = (str) =>
      str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

    const slug = generateSlug(name);

    const newProduct = new Product({
      name,
      slug,
      cate,
      color,
      price,
      image,
      offer,
      configDesc,
      description,
      review,
      rating,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  });
}

module.exports = new ProductController();
