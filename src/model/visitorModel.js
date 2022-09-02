const mongoose = require("mongoose")

const visitorSchema = new mongoose.Schema({
   

    fullName:{
        type:String
    },
    phone:{
        type:Number
    },
    businessEmail :{
        type:String
    },
    companyName:{
        type:String
    },
    host:{
        type:String
    },
    purpose:{
        typr:String
    },
    date:{
        type:Date
    },
    time:{
        type:timestamps
    }

})

module.exports = mongoose.model('visitor',visitorSchema)