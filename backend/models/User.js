const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    require: true,
    type: String,
    trim: true,
  },
  last_name: {
    require: true,
    type: String,
    trim: true,
  },
  email: {
    require: true,
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    require: true,
    trim: true,
    type: String,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
