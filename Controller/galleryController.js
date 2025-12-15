const Gallery = require('../Models/Gallery');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all galleries
const getGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.status(200).json(galleries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single gallery by ID
const getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new gallery
const createGallery = async (req, res) => {
  try {
    const { i_title } = req.body;
    let image = req.body.image; // Default to body if no file

    if (req.file) {
      // Upload to Cloudinary
      const stream = require('stream');
      const bufferStream = new stream.PassThrough();
      bufferStream.end(req.file.buffer);

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'akhilam/gallery', resource_type: 'image' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        bufferStream.pipe(uploadStream);
      });

      image = result.secure_url;
    }

    const newGallery = new Gallery({
      i_title,
      image,
    });

    const savedGallery = await newGallery.save();
    res.status(201).json(savedGallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a gallery
const updateGallery = async (req, res) => {
  try {
    const { i_title } = req.body;
    let image = req.body.image;

    if (req.file) {
      // Upload to Cloudinary
      const stream = require('stream');
      const bufferStream = new stream.PassThrough();
      bufferStream.end(req.file.buffer);

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'akhilam/gallery', resource_type: 'image' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        bufferStream.pipe(uploadStream);
      });

      image = result.secure_url;
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      { i_title, image },
      { new: true }
    );

    if (!updatedGallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }

    res.status(200).json(updatedGallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a gallery
const deleteGallery = async (req, res) => {
  try {
    const deletedGallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!deletedGallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    res.status(200).json({ message: 'Gallery deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGalleries,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
};