const db = require("../db");

//  CREATE a Category
exports.createCategory = (req, res) => {
  const { CategoryName } = req.body;
  const query = "INSERT INTO Category (CategoryName) VALUES (?)";

  db.query(query, [CategoryName], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: "Category added", CategoryId: result.insertId });
  });
};

//  GET all Categories
exports.getAllCategories = (req, res) => {
  db.query("SELECT * FROM Category", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// ✅ DELETE a Category
exports.deleteCategory = (req, res) => {
  db.query("DELETE FROM Category WHERE CategoryId = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Category deleted" });
  });
};
