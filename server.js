const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const productRoutes = require('./Routes/ProductRoutes');
app.use('/akhilam/products', productRoutes);

const publicRoutes = require('./Routes/publicRoutes');
app.use('/akhilam/public', publicRoutes);

const galleryRoutes = require('./Routes/galleryRoutes');
app.use('/akhilam/gallery', galleryRoutes);

const adminRoutes = require('./Routes/adminRoutes');
app.use('/akhilam/admin', adminRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
