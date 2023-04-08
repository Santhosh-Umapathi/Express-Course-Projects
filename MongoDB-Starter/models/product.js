const mongoose = require("mongoose");

//Schemas
const { ProductSchema } = require("../schemas");

const DB_COLLECTION_NAME = "Product";

//Model
const ProductModel = mongoose.model(DB_COLLECTION_NAME, ProductSchema);

module.exports = ProductModel;
