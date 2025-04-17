const { Product, Category,SubCategory } = require("../models");

// CREATE a new Product
exports.createProduct = async (req, res) => {
  try {
    console.log("Received Body:", req.body);
    console.log("Received File:", req.file);

    const {
      ProductId,
      ProductName,
      ProductDescription,
      UnitPrice,
      Quantity,
      Qty_Reorder,
      SubCategoryId,
      CategoryId,
      ImageURL,
      rating
    } = req.body;

    if (!ProductId) {
      return res.status(400).json({ error: "ProductId is required." });
    }

    let finalImageURL = ImageURL;
    if (req.file) {
      finalImageURL = req.file.path;
    }

    if (!finalImageURL) {
      return res.status(400).json({ error: "Image URL is required." });
    }

    const SubcategoryExists = await SubCategory.findByPk(SubCategoryId);
    if (!SubcategoryExists) {
      return res.status(400).json({ error: "Invalid SubCategoryId" });
    }

    const CategoryExists = await Category.findByPk(CategoryId);
    if (!CategoryExists) {
      return res.status(400).json({ error: "Invalid CategoryId" });
    }

    const product = await Product.create({
      ProductId,
      ProductName,
      ProductDescription,
      UnitPrice,
      Quantity,
      Qty_Reorder,
      ImageURL: finalImageURL,
      SubCategoryId,
      CategoryId,
      rating,
    });

    res.status(201).json({ message: "Product added", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all Products with stock status
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: [
        "ProductId",
        "ProductName",
        "ProductDescription",
        "UnitPrice",
        "Quantity",
        "SubCategoryId",
        "CategoryId",
        "ImageURL",
        "rating",
        [Product.sequelize.literal("CASE WHEN Quantity > 0 THEN 'In Stock' ELSE 'Out of Stock' END"), "StockStatus"],
      ],
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a Single Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ where: { ProductId: req.params.id } });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a Product
exports.updateProduct = async (req, res) => {
  try {
    const {
      ProductName,
      ProductDescription,
      UnitPrice,
      Quantity,
      Qty_Reorder,
      SubCategoryId,
      CategoryId,
      rating
    } = req.body;

    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (SubCategoryId) {
      const SubcategoryExists = await SubCategory.findByPk(SubCategoryId);
      if (!SubcategoryExists) {
        return res.status(400).json({ error: "Invalid SubCategoryId" });
      }
    }

    if (CategoryId) {
      const CategoryExists = await Category.findByPk(CategoryId);
      if (!CategoryExists) {
        return res.status(400).json({ error: "Invalid CategoryId" });
      }
    }

    await product.update({
      ProductName,
      ProductDescription,
      UnitPrice,
      Quantity,
      Qty_Reorder,
      CategoryId,
      SubCategoryId,
      rating
    });

    res.json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Product Quantity after sale
exports.updateProductQuantity = async (req, res) => {
  try {
    const { quantitySold } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.Quantity < quantitySold) {
      return res.status(400).json({ error: "Not enough stock available" });
    }

    await product.update({ Quantity: product.Quantity - quantitySold });

    res.json({ message: "Product quantity updated successfully", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// RESTOCK a Product (Admin Only)
exports.restockProduct = async (req, res) => {
  try {
    const { quantityAdded } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (quantityAdded <= 0) {
      return res.status(400).json({ error: "Restock quantity must be greater than 0." });
    }

    await product.update({ Quantity: product.Quantity + quantityAdded });

    res.json({ message: `Product restocked successfully with ${quantityAdded} more items.`, product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
