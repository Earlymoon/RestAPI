const { mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  company: String,
  price: Number,
  colors: [String],
  image: String,
  description: String,
  category: String,
  featured: { type: Boolean, default: false }, // Assuming featured is optional
  shipping: { type: Boolean, default: false }, // Assuming shipping is optional
});

const productsData = new mongoose.model("productData", productSchema);

module.exports = productsData;
