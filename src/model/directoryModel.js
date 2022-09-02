const mongoose = require("mongoose")

const directorySchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    gender: {
        type: String,
    },
    since: {
        type: String
    }

})

module.exports = mongoose.model('directory', directorySchema)