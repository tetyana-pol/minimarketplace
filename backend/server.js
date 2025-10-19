// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// MongoDB Connection - Make sure database name 'crabit' is in the URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crabit';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Image Schema & Model for existing 'images' collection
const imageSchema = new mongoose.Schema({}, { strict: false, collection: 'images' });
const Image = mongoose.model('Image', imageSchema);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Crabit Images API' });
});

// Get all images from crabit database
app.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new image document with file upload
app.post('/images', upload.single('img'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const imageData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      url: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
      mimetype: req.file.mimetype,
      size: req.file.size,
      createdAt: new Date()
    };

    const image = new Image(imageData);
    await image.save();
    res.status(201).json(image);
  } catch (err) {
    // Delete uploaded file if database save fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(400).json({ error: err.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});