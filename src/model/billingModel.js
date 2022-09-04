
const mongoose = require("mongoose")

const billingSchema = new mongoose.Schema({

    findUser: {
        type: String,
        trim: true,
        unique: true
    },
    paymentMethod: {
        type: String,
        enum: ["NEFT", "IMPS", "RTGS"]
    },
    totalAmount:{
        type: Number
    },
    paymentReference: {
        type: String,
        trim: true
    },
    shiftTime: {
        type: String
    },
    bookingStartDate: {
        type: Date,

    },
    bookingEndDate: {
        type: Date
    },

    bookingDuration: {
        type: String
    },
    spaceType: {
        type: String
    },
    plan: {
        type: String
    },
    features: {
        type: String
    },
    membership: {
        type: String
    }


}, { timestamps: true });

module.exports = mongoose.model('billing', billingSchema)