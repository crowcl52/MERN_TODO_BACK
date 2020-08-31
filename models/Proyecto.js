const mongoose = require('mongoose');

const ProyectSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    },
    createAt:{
        type: Date,
        default:Date.now
    }
});

module.exports = mongoose.model('Proyecto', ProyectSchema)