const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  getGalleries,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} = require('../Controller/galleryController');

// GET /akhilam/gallery - Get all galleries
router.get('/', getGalleries);

// GET /akhilam/gallery/:id - Get gallery by ID
router.get('/:id', getGalleryById);

// POST /akhilam/gallery - Create a new gallery
router.post('/', upload.single('image'), createGallery);

// PUT /akhilam/gallery/:id - Update a gallery
router.put('/:id', upload.single('image'), updateGallery);

// DELETE /akhilam/gallery/:id - Delete a gallery
router.delete('/:id', deleteGallery);

module.exports = router;