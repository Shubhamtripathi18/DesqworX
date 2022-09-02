const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({

   
    packageName: {
        type: String
    },
    visits: {
        type: Number
    },
    validity: {
        type: String
    },
    amount: {
        type: Number
    },
    packageNote: {
        type: String
    },
    trending: {
        type: String
    },
    status: {
        type: String
    }
})

module.exports = mongoose.model('package', packageSchema)
