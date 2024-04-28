const { mongoose } = require("mongoose");

const imageSchema = new mongoose.Schema({
  id: String,
  width: Number,
  height: Number,
  url: String,
  filename: String,
  size: Number,
  type: String,
});

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  company: String,
  price: Number,
  colors: [String],
  image: [imageSchema],
  description: String,
  category: String,
  featured: { type: Boolean, default: false }, // Assuming featured is optional
  shipping: { type: Boolean, default: false }, // Assuming shipping is optional
  stock: Number,
  reviews: Number,
  stars: Number,
});

const productsData = new mongoose.model("productData", productSchema);

module.exports = productsData;
