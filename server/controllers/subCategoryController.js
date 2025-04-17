const { SubCategory, Category } = require("../models");

// CREATE a SubCategory
exports.createSubCategory = async (req, res) => {
  try {
    const { SubCategoryId, SubCategoryName, CategoryId } = req.body;

    // Check if Category exists
    const category = await Category.findByPk(CategoryId);
    if (!category) return res.status(400).json({ error: "Invalid CategoryId" });

    const subCategory = await SubCategory.create({ SubCategoryId, SubCategoryName, CategoryId });
    res.status(201).json({ message: "SubCategory added", subCategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all SubCategories
exports.getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.findAll();
    res.json(subCategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SubCategories by Category
exports.getSubCategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const subCategories = await SubCategory.findAll({ where: { CategoryId: categoryId } });

    res.json(subCategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a SubCategory
exports.updateSubCategory = async (req, res) => {
  try {
    const { SubCategoryName, CategoryId } = req.body;
    const { id } = req.params;

    const subCategory = await SubCategory.findByPk(id);
    if (!subCategory) return res.status(404).json({ error: "SubCategory not found" });

    await subCategory.update({ SubCategoryName, CategoryId });
    res.json({ message: "SubCategory updated successfully", subCategory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a SubCategory
exports.deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const subCategory = await SubCategory.findByPk(id);

    if (!subCategory) return res.status(404).json({ error: "SubCategory not found" });

    await subCategory.destroy();
    res.json({ message: "SubCategory deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
