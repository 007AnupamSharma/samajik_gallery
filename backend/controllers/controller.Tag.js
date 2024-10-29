const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Tag = require('../models/TagSchema');
const dotenv = require('dotenv');


dotenv.config();

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });


// Helper function to upload a single image to Cloudinary
const uploadImageToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'your-folder-name' },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ url: result.secure_url, filename: result.original_filename });
                }
            }
        );
        uploadStream.end(file.buffer); // Pass the file buffer to end the stream
    });
};



// fetching all tag names
const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find({});
        const onlyTag = {
            tags: tags.map((tag) => tag.name)
        }
        res.status(200).json({ success: true, data: onlyTag });
    } catch (err) {
        console.log(err);
    }
}

// fetching all tag related images
const getTagImages = async (req, res) => {
    try {
        const { tag } = req.body;
        const existingTag = await Tag.findOne({ name: tag });
        if (!existingTag) {
            return res.status(400).json({ success: false, message: "Tag not found" });
        }
        const onlyImages = {
            images: existingTag.images.map((image) => image.url)
        }
        res.status(200).json({ success: true, data: onlyImages });
    } catch (err) {
        console.log(err);
    }
}

// creating a new tag
const createTag = async (req, res) => {
    try {
        const { tag } = req.body;

        const existingTag = await Tag.findOne({ name: tag });
        if (existingTag) {
            return res.status(400).json({ success: false, message: "Tag already exists" });
        }
        const newTag = await Tag.create({ name: tag });

        res.status(200).json({ success: true, data: newTag });
    } catch (err) {
        console.log(err);

    }
}

// adding add images entry
const addTagImages = async (req, res) => {
    try {
        const { tagName } = req.body;
        const files = req.files;

        // Find the tag or return error if it doesn't exist
        const existingTag = await Tag.findOne({ name: tagName });
        if (!existingTag) {
            return res.status(400).json({ success: false, message: "Tag not found" });
        }

        console.log("Chalega");

        // Initialize the images array if it doesn't exist
        if (!existingTag.images) {
            existingTag.images = [];
        }


        // Upload each image to Cloudinary and store URLs
        const uploadedImages = await Promise.all(
            files.map(
                (file) =>
                    new Promise((resolve, reject) => {
                        cloudinary.uploader.upload_stream(
                            { folder: 'tagName' },
                            (error, result) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve({ url: result.secure_url, filename: result.original_filename });
                                }
                            }
                        ).end(file.buffer);
                    })
            )
        );
        console.log("Chalega2");
        console.log(uploadedImages);
        
        // Add uploaded image URLs to the tag's images array
        existingTag.images.push(...uploadedImages);
        await existingTag.save();


        res.status(200).json({ success: true, data: existingTag });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Image upload failed' });
    }
}


module.exports = {
    getAllTags,
    getTagImages,
    createTag,
    addTagImages
};