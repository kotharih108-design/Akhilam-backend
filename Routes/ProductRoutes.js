const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../Controller/productController');

// GET /api/products - Get all products
router.get('/', getProducts);

// GET /api/products/:id - Get product by ID
router.get('/:id', getProductById);

// POST /api/products - Create a new product
router.post('/', upload.single('p_image'), createProduct);

// PUT /api/products/:id - Update a product
router.put('/:id', upload.single('p_image'), updateProduct);

// DELETE /api/products/:id - Delete a product
router.delete('/:id', deleteProduct);

module.exports = router;