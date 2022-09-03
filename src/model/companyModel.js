const mongoose = require("mongoose")

const companySchema = new mongoose.Schema({


    companyName: {
        type: String
    },
    companyAddress: {
        type: String
    },
    companyGST: {
        type: String
    },
    companyPAN: {
        type: String
    },


 }, {timestamps: true});

module.exports = mongoose.model('company', companySchema)