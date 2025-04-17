const { Category } = require("../models");

// CREATE Category
exports.createCategory = async (req, res) => {
  try {
    console.log("Received Data:", req.body);  // ✅ Debugging: Log input

    const { CategoryId, CategoryName } = req.body;  // Get CategoryId and CategoryName from request body

    if (!CategoryId) {
      return res.status(400).json({ message: "CategoryId is required" });  // Ensure CategoryId is provided
    }

    // Manually set the CategoryId when creating the category
    const category = await Category.create({ CategoryId, CategoryName });

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

// GET Category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({ where: { CategoryId: req.params.id } });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE Category
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;  // Get the categoryId from the URL parameter

    // First, check if the category exists
    const category = await Category.findOne({ where: { CategoryId: categoryId } });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });  // Prevent deletion of non-existing categories
    }

    // Delete the category only if it exists
    await Category.destroy({ where: { CategoryId: categoryId } });
    
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// UPDATE Category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params; // Get categoryId from the URL
    const { CategoryName } = req.body; // Get the new category name from the request body

    // Find the category by its ID
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Update the category name
    category.CategoryName = CategoryName;

    // Save the updated category
    await category.save();

    // Send the response with the updated category
    res.status(200).json({ message: "Category updated successfully", category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
