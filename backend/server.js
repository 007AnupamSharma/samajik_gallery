const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const connectDB = require('./config/db');
const createTag = require('./routes/routes.tag');
const cloudinary = require('cloudinary').v2;

dotenv.config();

// Configure Cloudinary credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", createTag);

const startServer = (req, res)=> {
    try{
        connectDB();
        app.listen(8080, ()=> console.log("Server started on port 8080"));
    }catch(error){
        console.log(error);
        
    }
}

startServer();
