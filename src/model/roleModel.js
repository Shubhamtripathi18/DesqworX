const mongoose = require("mongoose")

const roleModelSchema = new mongoose.Schema({

 
        role: {
            type: String,
            required: true,
            trim: true
        },
       
        descriptions: {
            type: String,
            trim: true
        }
    },

 
     { timestamps: true });

module.exports = mongoose.model('createRoleModel', roleModelSchema)