const mongoose = require("mongoose")

const profarmaSchema = new mongoose.Schema({

    findUser: {
        type: String,
        required: true,

    },
    shiftTime: {
        type: String
    },
    bookingStartDate: {
        type: String
    },
    bookingEndDate: {
        type: String
    },
    bookingDuration: {
        type: String
    }

})