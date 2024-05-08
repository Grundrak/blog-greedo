const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    require: true,
    type: String,
    trim: true,
  },
  author: {
    require: true,
    type: String,
    trim: true,
  },
  image: {
    require: true,
    type: String,
  },
  text: {
    require: true,
    type: String,
  },
  status: {
    default: "Processing",
    enum: [ "Processing", "Complited", "Cancelled"],
    type: String,
  },
});

module.exports = mongoose.model("Blog", BlogSchema);
