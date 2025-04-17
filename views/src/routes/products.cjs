const express = require('express');
const Product = require('../models/products.cjs'); // Import Product model
const Category = require('../models/category.cjs'); // Import Category model
const { v2: cloudinary } = require('cloudinary');
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all products or filter by category names
router.get('/', async (req, res) => {
    try {
        let filter = {};

        // Check if category filter is provided in the query
        if (req.query.categoryNames) {
            const categoryNames = req.query.categoryNames.split(',').map(name => name.trim()); // Split comma-separated category names

            const categories = await Category.find({ name: { $in: categoryNames } });
            const categoryIds = categories.map(category => category._id);

            if (categoryIds.length === 0) {
                return res.status(404).json({ success: false, message: 'No categories found' });
            }

            filter = { category: { $in: categoryIds } }; // Filter products by the found category IDs
        }

        // Handle price filter
        if (req.query.price) {
            if (req.query.price === "under50") filter.price = { $lt: 50 };
            if (req.query.price === "50to100") filter.price = { $gte: 50, $lte: 100 };
            if (req.query.price === "over100") filter.price = { $gt: 100 };
        }

        // Handle rating filter
        if (req.query.rating) {
            if (req.query.rating === "under4") filter.rating = { $lt: 4 };
            if (req.query.rating === "4to4.5") filter.rating = { $gte: 4, $lte: 4.5 };
            if (req.query.rating === "above4.5") filter.rating = { $gt: 4.5 };
        }

        // Fetch products with optional filtering
        const productList = await Product.find(filter).populate('category');

        if (!productList || productList.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found' });
        }

        res.send(productList);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Create a new product
router.post('/create', async (req, res) => {
    try {
        const pLimit = (await import('p-limit')).default;
        const limit = pLimit(2);

        // Upload images to Cloudinary
        const imageUploads = req.body.images.map((image) => {
            return limit(() => cloudinary.uploader.upload(image));
        });

        const uploadedImages = await Promise.all(imageUploads);

        // Save new product
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            rating: req.body.rating,
            category: req.body.category,
            images: uploadedImages.map((img) => img.secure_url),
        });

        await newProduct.save();
        res.status(201).json({ success: true, message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
