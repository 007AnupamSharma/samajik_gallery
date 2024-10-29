const mongoose = require("mongoose");


const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    images: [{
        url: { type: String, required: true },
        filename: { type: String,  }
    }],
    createdAt: { type: Date, default: Date.now },
});

const tagModel = new mongoose.model("tagSchema", TagSchema);

module.exports = tagModel;