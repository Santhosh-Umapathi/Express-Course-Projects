const express = require("express");
require("dotenv").config();

//Controllers
const { createProduct, getProducts } = require("./mongoose");

const app = express();
const PORT = 5000;

app.use(express.json());

//Routes
app.post("/products", createProduct);
app.get("/products", getProducts);

app.listen(PORT);
console.log("Listening on PORT:", PORT);
