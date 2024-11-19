import express from 'express';
import { createListing, deleteListing, updateListing, getListing, uploadImages } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import multer from 'multer';  // Import multer
import path from 'path';

// Set up multer for image uploads
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Filename configuration
    }
  });  

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);

// Add upload route
router.post('/upload', upload.array('images', 6), uploadImages);

export default router;
