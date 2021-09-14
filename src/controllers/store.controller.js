const mp = require("mercadopago");
const StoreItem = require("../models/StoreItem");
const storeCtrl = {};

storeCtrl.getAllProducts = async (req, res) => {
  try {
    const products = await StoreItem.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

storeCtrl.getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await StoreItem.findById(id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

storeCtrl.postProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (isNaN(price)) return res.status(404).json({ message: 'incorrect value' })
    const product = new StoreItem({
      name,
      description,
      price,
    });
    await product.save();
    res.json({ message: "product created" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

storeCtrl.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, price } = req.body;
    if (isNaN(price)) return res.status(400).json({ message: 'incorrect value' })
    await StoreItem.findByIdAndUpdate(id, { name, description, price });
    res.json({ message: "product updated success" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

storeCtrl.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await StoreItem.findByIdAndDelete(id);
    res.json({ message: "product delete success" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = storeCtrl;
