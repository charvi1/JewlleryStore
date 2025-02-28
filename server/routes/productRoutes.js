const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middleware/upload"); 

router.post("/", upload.single("Image"), productController.createProduct); 
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", upload.single("Image"), productController.updateProduct); 
router.delete("/:id", productController.deleteProduct);
router.put("/restock/:id", productController.restockProduct);
router.put("/update-stock/:id", productController.updateProductQuantity);


module.exports = router;
