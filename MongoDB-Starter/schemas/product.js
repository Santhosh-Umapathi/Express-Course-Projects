const mongoose = require("mongoose");

//Product Schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = ProductSchema;
