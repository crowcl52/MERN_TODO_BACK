const mongoose = require('mongoose');
const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    description:{
        type: String,
        require: true,
        trim: true
    },
    status:{
        type: Boolean,
        default: false,
        require: true
    },
    duration:{
        type: Number,
        require: true
    },
    remain:{
        type: Number,
        require: true
    },
    inprogress:{
        type: Boolean,
        default: false,
        require: true
    },
    index:{
        type: Number,
        require: true
    },
    createAt:{
        type: Date,
        default: Date.now
    },
    completeAt:{
        type: Date,
    },
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    }
});

module.exports = mongoose.model('Task', TaskSchema);