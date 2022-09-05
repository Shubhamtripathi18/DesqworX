const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const staffSchema = new mongoose.Schema({


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
        type: ObjectId
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

module.exports = mongoose.model('adminRegister', staffSchema)