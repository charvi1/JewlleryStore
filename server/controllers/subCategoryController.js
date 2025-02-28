const db = require("../db");

//  CREATE a SubCategory
exports.createSubCategory = (req, res) => {
  const { SubCategoryName, CategoryId } = req.body;

  // Check if CategoryId exists
  db.query("SELECT * FROM Category WHERE CategoryId = ?", [CategoryId], (err, result) => {
    if (err) return res.status(500).json(err);
    
    if (result.length === 0) {
      return res.status(400).json({ error: "Invalid CategoryId. Please create the category first." });
    }

    const query = "INSERT INTO SubCategory (SubCategoryName, CategoryId) VALUES (?, ?)";
    db.query(query, [SubCategoryName, CategoryId], (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "SubCategory added", SubCategoryId: result.insertId });
    });
  });
};

//  GET all SubCategories
exports.getAllSubCategories = (req, res) => {
  db.query("SELECT * FROM SubCategory", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

//  DELETE a SubCategory
exports.deleteSubCategory = (req, res) => {
  db.query("DELETE FROM SubCategory WHERE SubCategoryId = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "SubCategory deleted" });
  });
};



// UPDATE a SubCategory
exports.updateSubCategory = (req, res) => {
  const { SubCategoryName, CategoryId } = req.body;

  // Check if CategoryId exists
  db.query("SELECT * FROM Category WHERE CategoryId = ?", [CategoryId], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(400).json({ error: "Invalid CategoryId. Please check the category ID." });
    }

    const query = "UPDATE SubCategory SET SubCategoryName = ?, CategoryId = ? WHERE SubCategoryId = ?";
    db.query(query, [SubCategoryName, CategoryId, req.params.id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "SubCategory updated successfully" });
    });
  });
};

// GET All SubCategories Under a Single Category
exports.getSubCategoriesByCategory = (req, res) => {
  db.query("SELECT * FROM SubCategory WHERE CategoryId = ?", [req.params.categoryId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};
