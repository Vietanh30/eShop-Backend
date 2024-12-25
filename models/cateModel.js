const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subCateModel = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  parent: {
    name: { type: String, required: true },
    slug: { type: String, required: true },
  },
});

const cateModel = new Schema(
  {
    phone: {
      type: [subCateModel],
      required: true,
    },
    laptop: {
      type: [subCateModel],
      required: true,
    },
    tablet: {
      type: [subCateModel],
      required: true,
    },
    monitor: {
      type: [subCateModel],
      required: true,
    },
    tivi: {
      type: [subCateModel],
      required: true,
    },
    watch: {
      type: [subCateModel],
      required: true,
    },
    speakerHeadphone: {
      type: [subCateModel],
      required: true,
    },
    oldProduct: {
      type: [subCateModel],
      required: true,
    },
    service: {
      type: [subCateModel],
      required: true,
    },
    accessory: {
      type: [subCateModel],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cate", cateModel);
