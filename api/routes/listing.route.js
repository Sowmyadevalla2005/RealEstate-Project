import express from 'express';
import multer from 'multer'; // Import multer
import { createListing, deleteListing, updateListing, getListing, getListings } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename based on timestamp
  }
});

const upload = multer({ storage: storage }).array('images', 6); // Define the upload field name ('images') and limit to 6 files

const router = express.Router();

// Routes for listing CRUD operations
router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);

// Route to handle file uploads
router.post('/upload', upload, (req, res) => {
  if (req.files) {
    const fileUrls = req.files.map(file => `/uploads/${file.filename}`);
    return res.json({ success: true, files: fileUrls }); // Send the URLs of the uploaded images
  } else {
    return res.status(400).json({ success: false, message: 'No files uploaded.' });
  }
});

export default router;
