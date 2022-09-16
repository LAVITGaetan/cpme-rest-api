const mongoose = require('mongoose');

// Question Schema
const QuestionSchema = new mongoose.Schema({
    label: {
        type: String,
        required : true,
    },
    required: {
        type: Boolean,
        required : true,
    },
    description: {
        set: {
            type : Boolean,
        },
        content: {
            type : String,
        }
    },
    type: {
        type: String,
        required : true
    },
    order: {
        type : Number,
        required : true
    }
});

module.exports = new mongoose.model('Question', QuestionSchema);