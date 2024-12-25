const Product = require("../models/productModel");
const Cate = require("../models/cateModel");
const asyncHandler = require("express-async-handler");

class ProductController {
  // [ GET : ROUTE: api/product ]
  getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
  });

  // [ GET : ROUTE: api/product/:slug ]
  getProductBySlug = asyncHandler(async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product does not exist!");
    }
  });

  // [ GET : ROUTE: api/product/phone ]
  getProductPhone = asyncHandler(async (req, res) => {
    const products = await Product.find({
      $or: [
        { cate: { $elemMatch: { slug: "phone" } } },
        { cate: { $elemMatch: { slug: "uu-dai-hot-dien-thoai" } } },
        { cate: { $elemMatch: { slug: "dich-vu-dien-thoai" } } },
        { cate: { $elemMatch: { slug: "dien-thoai-gap" } } },
      ],
    });
    if (!req.query.size) res.json(products);
    else res.json(products.slice(0, req.query.size));
  });

  // [ GET : ROUTE: api/product/laptop ]
  getProductLaptop = asyncHandler(async (req, res) => {
    const products = await Product.find({
      $or: [
        { cate: { $elemMatch: { slug: "laptop" } } },
        { cate: { $elemMatch: { slug: "uu-dai-hot-laptop" } } },
      ],
    });
    res.json(products);
  });

  // [ GET : ROUTE: api/product/tablet ]
  getProductTablet = asyncHandler(async (req, res) => {
    const products = await Product.find({
      $or: [
        { cate: { $elemMatch: { slug: "tablet" } } },
        { cate: { $elemMatch: { slug: "uu-dai-hot-tablet" } } },
      ],
    });
    res.json(products);
  });

  // [ GET : ROUTE: api/product/monitor ]
  getProductMonitor = asyncHandler(async (req, res) => {
    const products = await Product.find({
      cate: { $elemMatch: { slug: "monitor" } },
    });
    res.json(products);
  });

  // [ GET : ROUTE: api/product/tivi ]
  getProductTivi = asyncHandler(async (req, res) => {
    const products = await Product.find({
      cate: { $elemMatch: { slug: "tivi" } },
    });
    res.json(products);
  });

  // [ GET : ROUTE: api/product/watch ]
  getProductWatch = asyncHandler(async (req, res) => {
    const products = await Product.find({
      cate: { $elemMatch: { slug: "watch" } },
    });
    res.json(products);
  });

  // [ GET : ROUTE: api/product/speakHead ]
  getProductSpeakerHead = asyncHandler(async (req, res) => {
    const products = await Product.find({
      cate: { $elemMatch: { slug: "speakerHeadphone" } },
    });
    res.json(products);
  });

  // [ GET : ROUTE: api/product/oldProduct ]
  getProductOldProduct = asyncHandler(async (req, res) => {
    const products = await Product.find({
      cate: { $elemMatch: { slug: "oldProduct" } },
    });
    res.json(products);
  });

  // [ GET : ROUTE: api/product/service ]
  getProductService = asyncHandler(async (req, res) => {
    const products = await Product.find({
      cate: { $elemMatch: { slug: "service" } },
    });
    res.json(products);
  });

  // [ GET : ROUTE: api/product/accessory ]
  getProductAccessory = asyncHandler(async (req, res) => {
    const products = await Product.find({
      $or: [
        { cate: { $elemMatch: { slug: "accessory" } } },
        { cate: { $elemMatch: { slug: "phu-kien-loa-tai-nghe" } } },
        { cate: { $elemMatch: { slug: "smart-home" } } },
        { cate: { $elemMatch: { slug: "do-choi-cong-nghe" } } },
        { cate: { $elemMatch: { slug: "dich-vu" } } },
      ],
    });
    res.json(products);
  });

  // [ GET : ROUTE: api/product/cate ]
  getAllCates = asyncHandler(async (req, res) => {
    const cates = await Cate.find({});
    res.json(cates);
  });

  // [ GET : ROUTE: api/product/cateArr ]
  getAllCatesArray = asyncHandler(async (req, res) => {
    let cates = await Cate.find({}).lean();
    cates[0].phone.forEach(function (e) {
      e.bigSlug = "phone";
    });
    cates[0].laptop.forEach(function (e) {
      e.bigSlug = "laptop";
    });
    cates[0].tablet.forEach(function (e) {
      e.bigSlug = "tablet";
    });
    cates[0].monitor.forEach(function (e) {
      e.bigSlug = "monitor";
    });
    cates[0].tivi.forEach(function (e) {
      e.bigSlug = "tivi";
    });
    cates[0].speakerHeadphone.forEach(function (e) {
      e.bigSlug = "speakerHeadphone";
    });
    cates[0].oldProduct.forEach(function (e) {
      e.bigSlug = "oldProduct";
    });
    cates[0].service.forEach(function (e) {
      e.bigSlug = "service";
    });
    cates[0].accessory.forEach(function (e) {
      e.bigSlug = "accessory";
    });
    cates[0].watch.forEach(function (e) {
      e.bigSlug = "watch";
    });
    const ans = [
      ...cates[0].phone,
      ...cates[0].laptop,
      ...cates[0].tablet,
      ...cates[0].monitor,
      ...cates[0].tivi,
      ...cates[0].watch,
      ...cates[0].speakerHeadphone,
      ...cates[0].oldProduct,
      ...cates[0].service,
      ...cates[0].accessory,
    ];
    res.json(ans);
  });

  //  [ GET - ROUTE: api/product/:id ]
  getProductByID = asyncHandler(async (req, res) => {
    var product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product does not exist!");
    }
  });

  //  [ PATCH - ROUTE: api/:id ]
  updateProduct = asyncHandler(async (req, res) => {
    var pro = await Product.findById(req.params.id);
    const data = JSON.parse(req.body.data)
    if (pro) {
      var newPro = await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          name: data.name || pro.name,
          price: data.price || pro.price,
          image: data.image || pro.image,
          offer: data.offer || pro.offer,
          configTitle: data.configTitle || pro.configTitle,
          configImage: data.configImage || pro.configImage,
          configDesc: data.configDesc || pro.configDesc,
          description: data.description || pro.description,
        },
        {
          new: true,
        }
      );
      res.json(newPro);
    } else {
      res.status(404);
      throw new Error("Product does not exist");
    }
  });
}

module.exports = new ProductController();
