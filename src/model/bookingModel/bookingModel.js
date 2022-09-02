const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        unique: true
    },
    companyName: {
        type: String,
        trim: true
    },
    contactNumber: {
        type: Number,
        trim: true
    },
    bookingStart: {
        type: String,
        
    },
    bookingEnd: {
        type: String
    },

    bookingDuration: {
        type:String
    }

}, { timestamps: true });

module.exports = mongoose.model('booking', bookingSchema)