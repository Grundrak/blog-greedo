const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const route = require("./routes/api");
const cloudinary = require("cloudinary");

const cloudinaryUrl = process.env.CLOUDINARY_URL;
const parsedUrl = new URL(cloudinaryUrl);

app.use(express.json());

cloudinary.config({
  cloud_name: parsedUrl.hostname,
  api_key: parsedUrl.username,
  api_secret: parsedUrl.password,
  secure: true, 
});

module.exports = app;
