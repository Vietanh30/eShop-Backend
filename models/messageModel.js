const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageModel = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  typeUser: {
    type: String,
    require: true,
  },
  typeMessage: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  startTime: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Message", messageModel);
