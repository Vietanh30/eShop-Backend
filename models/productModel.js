const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productModel = new Schema(
  {
    slug: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    cate: {
      type: Schema.Types.ObjectId,
      ref: "Categories"
    },
    color: {
      type: [String],
      required: true,
      default: [],
    },
    price: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
      default: [],
    },
    offer: {
      type: Number,
      required: true,
      default: [],
    },
    configDesc: {
      type: Object,
      required: true,
      default: {},
    },
    description: {
      type: [String],
      required: true,
      default: [],
    },
    review: {
      type: [String],
      required: true,
      default: [],
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productModel);
