const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({


    title: {
        type: String,
        enum: ["Mr", "Miss", "Mrs"]
    },
    adminName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    role: {
        type: String
    },
    city: {
        type: String,
    },
    location: {
        type: String
    },
    phone: {
        type: Number,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true
    }

}, { timestamps: true });

module.exports = mongoose.model('adminRegister', adminSchema)