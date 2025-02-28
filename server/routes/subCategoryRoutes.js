const express = require("express");
const router = express.Router();
const subCategoryController = require("../controllers/subCategoryController");

router.post("/", subCategoryController.createSubCategory);
router.get("/", subCategoryController.getAllSubCategories);
router.get("/category/:categoryId", subCategoryController.getSubCategoriesByCategory); 
router.put("/:id", subCategoryController.updateSubCategory); 
router.delete("/:id", subCategoryController.deleteSubCategory);

module.exports = router;
