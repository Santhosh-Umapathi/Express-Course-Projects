const mongoose = require("mongoose");
//Model
const { Product } = require("./models");

const url = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@playground-cluster.liar9.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

//Initialize DB connection
mongoose
  .connect(url)
  .then(() => console.log("Connected to Database:rn-ger-mongodb-starter"))
  .catch((err) =>
    console.log("Error connecting to Database:rn-ger-mongodb-starter", err)
  );

const createProduct = async (req, res, next) => {
  const { name, price } = req.body;

  const createdProduct = new Product({ name, price });

  const result = await createdProduct.save();

  return res
    .status(200)
    .json({ message: " Product created successfully", product: result });
};

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();
  // const products = await Product.find().cursor()// Default collection object like mongoDb methods

  return res.status(200).json({ message: " Products found", products });
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
