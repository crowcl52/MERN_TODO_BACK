const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim: true
    },
    email:{
        type: String,
        required:true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required:true,
        trim: true
    },
    register:{ 
        type: Date,
        default: Date.now
    },
    photo:{
        type: String,
        required:false,
        trim: true
    }
});

module.exports = mongoose.model('Usuario', UsuariosSchema)