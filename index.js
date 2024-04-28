const connectDb = require("./db/conn");
const productsData = require("./models/products");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;
const mongoURI = process.env.MONGODB_URL;

app.post("/api/products", async (req, res) => {
  try {
    const myProduct = new productsData(req.body);
    console.log(myProduct);
    const items = await myProduct.save();
    res.status(201).send(items);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const allProducts = await productsData.find({});

    res.status(201).send(allProducts);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const allProduct = await productsData.findOne({ id: productId });

    res.status(201).send(allProduct);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.patch("/api/products/:id", async (req, res) => {
  try {
    // const id = req.params.id;
    // const allProduct = await productsData.findByIdAndUpdate(id, req.body, {
    //   new: true,
    // });

    const productId = req.params.id;
    const updatedProduct = await productsData.findOneAndUpdate(
      { id: productId },
      req.body,
      { new: true }
    );

    res.status(201).send(updatedProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    // const id = req.params.id;
    // const allProduct = await productsData.findByIdAndDelete(id);

    const productId = req.params.id;
    const deletedProduct = await productsData.findOneAndDelete({
      id: productId,
    });

    res.status(201).send(deletedProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete all
app.delete("/api/products", async (req, res) => {
  try {
    // const allProduct = await productsData.deleteMany({});

    const deletedProducts = await productsData.deleteMany({});
    res.status(200).json(deletedProducts);

    // res.status(201).send(deletedProducts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// app.get("/", (req, res) => {
//   res.send("hello ");
// });

const start = async () => {
  try {
    await connectDb(mongoURI);
    app.listen(port, () => {
      console.log(`connection is live at port no. ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
