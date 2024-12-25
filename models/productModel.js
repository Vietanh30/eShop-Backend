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
      type: [
        {
          slug: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
      default: [],
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
      type: [String],
      required: true,
      default: [],
    },
    configTitle: {
      type: String,
      required: true,
      default: "",
    },
    configImage: {
      type: String,
      required: true,
      default: "",
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
    similarProduct: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          slug: {
            type: String,
            required: true,
          },
          img: {
            type: String,
            required: true,
          },
        },
      ],
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
    news: {
      type: {
        name: { type: String, required: true },
        slug: { type: String, required: true },
        subNews: [
          {
            name: {
              type: String,
              required: true,
            },
            time: {
              type: String,
              required: true,
            },
            img: {
              type: String,
              required: true,
            },
            slug: {
              type: String,
              required: true,
            },
          },
        ],
      },
      required: true,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productModel);
