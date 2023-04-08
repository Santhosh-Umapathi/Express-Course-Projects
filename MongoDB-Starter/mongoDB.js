const MongoClient = require("mongodb").MongoClient;

const url = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASSWORD}@playground-cluster.liar9.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(url);
const openConnection = async () => await client.connect();
const closeConnection = () => client.close();
const db = client.db();

const createProduct = async (req, res, next) => {
  const { name, price } = req.body;
  const product = { name, price };

  try {
    await openConnection();

    const result = await db.collection("products").insertOne(product);
  } catch (error) {
    return res.status(422).json({ message: "Product creation failed" });
  }

  closeConnection();

  return res
    .status(200)
    .json({ message: " Product created successfully", product });
};

const getProducts = async (req, res, next) => {
  let products;
  try {
    await openConnection();

    products = await db.collection("products").find().toArray();
  } catch (error) {
    return res.status(422).json({ message: "Products not found" });
  }

  closeConnection();

  return res.status(200).json({ message: " Products found", products });
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
