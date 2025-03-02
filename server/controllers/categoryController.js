const { Category } = require("../models");

// CREATE Category
exports.createCategory = async (req, res) => {
  try {
    console.log("Received Data:", req.body);  // ✅ Debugging: Log input

    const { CategoryName } = req.body;
    const category = await Category.create({ CategoryName });

    res.status(201).json({ message: "Category added", category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// GET All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE Category
exports.deleteCategory = async (req, res) => {
  try {
    await Category.destroy({ where: { CategoryId: req.params.id } });
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};
