const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const uploadController = require("./uploadController");
class ProductController {
  // [GET: api/product] - Lấy tất cả sản phẩm
  getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ status: 1 }).populate("cate", "name slug");
    res.json(products);
  });

  // [GET: api/product/:slug] - Lấy sản phẩm theo slug
  getProductBySlug = asyncHandler(async (req, res) => {
    const product = await Product.findOne({ status: 1, slug: req.params.slug }).populate(
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
  getProductByCate = asyncHandler(async (req, res) => {
    const product = await Product.find({ status: 1, cate: req.params.cateId }).populate(
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
  // [PATCH: api/product/:id] - Cập nhật sản phẩm
  updateProduct = asyncHandler((req, res) => {
    const uploadHandler = uploadController.upload.array("images", 10); // Middleware upload

    uploadHandler(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          message: "Upload thất bại!",
          error: err.message,
        });
      }

      const { name, cate, price, offer, color, configDesc, description } =
        req.body;

      // Chuyển đổi JSON string thành đối tượng
      const parsedConfigDesc = JSON.parse(configDesc);
      const parsedColor = JSON.parse(color);
      const parsedDescription = JSON.parse(description);

      // Chuyển đổi các file upload thành link
      const images = (req.files || []).map((file) => changeLinkUpload(file));

      // Tạo slug từ tên sản phẩm
      const generateSlug = (str) =>
        str
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-");

      const product = await Product.findById(req.params.id);

      if (!product) {
        res.status(404).json({ message: "Product does not exist!" });
        return;
      }

      // Cập nhật các trường
      const updatedFields = {
        name: name || product.name, // Giữ nguyên tên nếu không có update
        slug: name ? generateSlug(name) : product.slug, // Cập nhật slug nếu có tên mới
        cate: cate || product.cate,
        price: price || product.price,
        offer: offer || product.offer,
        color: parsedColor || product.color,
        image: images.length > 0 ? images : product.image, // Cập nhật hình ảnh nếu có
        configDesc: parsedConfigDesc || product.configDesc,
        description: parsedDescription || product.description,
      };

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updatedFields,
        { new: true }
      );

      res.json(updatedProduct);
    });
  });

  // [POST: api/product] - Tạo sản phẩm mới
  createProduct = asyncHandler((req, res) => {
    const uploadHandler = uploadController.upload.array("images", 10); // Middleware upload

    uploadHandler(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          message: "Upload thất bại!",
          error: err.message,
        });
      }

      // Parse dữ liệu từ form-data
      const { name, cate, price, offer, review, rating } = req.body;

      // Parse các trường phức tạp (JSON string)
      const color = JSON.parse(req.body.color);
      const configDesc = JSON.parse(req.body.configDesc);
      const description = JSON.parse(req.body.description);

      // Chuyển đổi các file upload thành link
      const images = (req.files || []).map((file) => changeLinkUpload(file));

      // Tạo slug từ tên sản phẩm
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
        image: images, // Lưu link ảnh vào trường image
        offer,
        configDesc,
        description,
        review,
        rating,
      });

      const savedProduct = await newProduct.save();
      res.status(201).json({
        message: "Tạo sản phẩm thành công!",
        product: savedProduct,
      });
    });
  });
  deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    product.status = 0;
    product.save();
    res.status(200).json({
      message: "Xóa sản phẩm thành công!",
      product: savedProduct,
    });
  })
}
function changeLinkUpload(file) {
  return "http://localhost:8000/" + file.destination + file.filename;
}
module.exports = new ProductController();
