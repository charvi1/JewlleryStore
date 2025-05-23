const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middleware/upload");

router.post("/", upload.single("image"), productController.createProduct);
router.put("/:id", upload.single("image"), productController.updateProduct);

router.get("/", productController.getAllProducts);  // Single get route with filtering inside controller
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.deleteProduct);
router.put("/restock/:id", productController.restockProduct);
router.put("/update-stock/:id", productController.updateProductQuantity);

module.exports = router;
