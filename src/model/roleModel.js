const mongoose = require("mongoose")

const roleModelSchema = new mongoose.Schema({

 
        role: {
            type: String,
            required: true,
            trim: true
        },
        name: {
            type: String,
            trim: true,
           
        },
        email: {
            type: String,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            trim: true
        },
        location: {
            type: String,
           
        },
        descriptions: {
            type: String,
            trim: true
        }
    },

 
     { timestamps: true });

module.exports = mongoose.model('createRoleModel', roleModelSchema)