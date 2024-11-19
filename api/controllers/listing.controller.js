import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const upload = multer({ dest: 'uploads/' });

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if(!listing) {
    return next(errorHandler(404, 'Listing not found'));
  }

  if(req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  }
  catch(error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  
  const listing = await Listing.findById(req.params.id);

  if(!listing) {
    return next(errorHandler(404, 'Listing not found'));
  }
  if(req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    );
    res.status(200).json(updatedListing);
  }
  catch(error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if(!listing) {
      return next(errorHandler(404, 'Listing not found'));
    }
    res.status(200).json(listing);
  }
  catch(error) {
    next(error);
  }
}

export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No images uploaded' });
    }

    const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);
    res.json({ success: true, urls: imageUrls });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};