const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');

// GET /akhilam/public/products - Get all products (public)
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /akhilam/public/products/:id - Get product by ID (public)
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /akhilam/public/gallery - Get all galleries (public)
router.get('/gallery', async (req, res) => {
  try {
    const Gallery = require('../Models/Gallery');
    const galleries = await Gallery.find();
    res.status(200).json(galleries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /akhilam/public/gallery/:id - Get gallery by ID (public)
router.get('/gallery/:id', async (req, res) => {
  try {
    const Gallery = require('../Models/Gallery');
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;