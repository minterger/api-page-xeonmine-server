const { Router } = require("express");
const {
  getAllProducts,
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/store.controller");
const { verifyToken, verifyRole } = require("../middlewares/index");
const router = Router();

router.get("/products", verifyToken, getAllProducts);

router.get("/product/:id", [verifyToken, verifyRole.isAdmin], getProduct);

router.post("/product", [verifyToken, verifyRole.isAdmin], postProduct);

router.put("/product/:id", [verifyToken, verifyRole.isAdmin], updateProduct);

router.delete("/product/:id", [verifyToken, verifyRole.isAdmin], deleteProduct);

module.exports = router;
