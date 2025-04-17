const express = require("express");
const router = express.Router();
const subCategoryController = require("../controllers/subCategoryController");

// Ensure that all handlers exist in subCategoryController
router.post("/", subCategoryController.createSubCategory);
router.get("/", subCategoryController.getAllSubCategories);
router.get("/:categoryId", subCategoryController.getSubCategoriesByCategory);
router.put("/:id", subCategoryController.updateSubCategory);
router.delete("/:id", subCategoryController.deleteSubCategory);

module.exports = router;
