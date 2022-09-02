const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const spaceTypeSchema = new mongoose.Schema({

    desks: {
        type: String,
        trim: true,

    },
    createdBy: {
        type: ObjectId

    },
    city: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },

    price: {
        type: Number
    },
    availability: {
        type: Number
    },
    facilities: {
        type: [String],
        trim: true
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

module.exports = mongoose.model('spaceType', spaceTypeSchema)