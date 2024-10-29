const express = require('express');
const router = express.Router();
const { createTag, getAllTags, addTagImages, getTagImages } = require('../controllers/controller.Tag');
const multer = require('multer');

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/createTag", createTag);
router.get("/getAllTags", getAllTags);
router.post('/addTagImages', upload.array('images'), addTagImages);
router.post("/getTagImages", getTagImages);

module.exports = router