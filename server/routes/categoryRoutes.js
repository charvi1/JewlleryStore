const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { updateCategory } = require('../controllers/categoryController');
const { getCategoryById } = require('../controllers/categoryController');

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.delete("/:id", categoryController.deleteCategory);
router.put('/categories/:id', updateCategory);
router.get('/categories/:id', getCategoryById);

module.exports = router;
