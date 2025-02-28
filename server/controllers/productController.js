const db = require("../db");

// CREATE a new Product
exports.createProduct = (req, res) => {
  const { ProductName, ProductDescription, UnitPrice, Quantity, Qty_Reorder, SubCategoryId } = req.body;
  const ImageURL = req.file ? req.file.path : null; 

  const query = "INSERT INTO Product (ProductName, ProductDescription, UnitPrice, Quantity, Qty_Reorder, ImageURL, SubCategoryId) VALUES (?, ?, ?, ?, ?, ?, ?)";

  db.query(query, [ProductName, ProductDescription, UnitPrice, Quantity, Qty_Reorder, ImageURL, SubCategoryId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: "Product added", productId: result.insertId });
  });
};


//  GET all Products
exports.getAllProducts = (req, res) => {
  const query = `
  SELECT ProductId, ProductName, Quantity, 
         CASE 
             WHEN Quantity > 0 THEN 'In Stock'
             ELSE 'Out of Stock'
         END AS StockStatus
  FROM Product
`;
  db.query("SELECT * FROM Product", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// GET a Single Product by ID
exports.getProductById = (req, res) => {
  db.query("SELECT * FROM Product WHERE ProductId = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};

// UPDATE a Product
exports.updateProduct = (req, res) => {
  const { ProductName, ProductDescription, UnitPrice, Quantity, Qty_Reorder, SubCategoryId } = req.body;
  const query = "UPDATE Product SET ProductName=?, ProductDescription=?, UnitPrice=?, Quantity=?, Qty_Reorder=?, SubCategoryId=? WHERE ProductId=?";
  
  db.query(query, [ProductName, ProductDescription, UnitPrice, Quantity, Qty_Reorder, SubCategoryId, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product updated" });
  });
};

//  DELETE a Product
exports.deleteProduct = (req, res) => {
  db.query("DELETE FROM Product WHERE ProductId = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product deleted" });
  });
};

//update product quantity acc to stock
exports.updateProductQuantity = (req, res) => {
  const { quantitySold } = req.body;
  const productId = req.params.id;

  const query = "UPDATE Product SET Quantity = Quantity - ? WHERE ProductId = ? AND Quantity >= ?";

  db.query(query, [quantitySold, productId, quantitySold], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Not enough stock available or invalid product ID." });
    }

    res.json({ message: "Product quantity updated successfully" });
  });
};
// RESTOCK a Product (Admin Only)
exports.restockProduct = (req, res) => {
  const { quantityAdded } = req.body; // Amount to restock
  const productId = req.params.id;

  if (quantityAdded <= 0) {
    return res.status(400).json({ message: "Restock quantity must be greater than 0." });
  }

  const query = "UPDATE Product SET Quantity = Quantity + ? WHERE ProductId = ?";

  db.query(query, [quantityAdded, productId], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.json({ message: `Product restocked successfully with ${quantityAdded} more items.` });
  });
};

