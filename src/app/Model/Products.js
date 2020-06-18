const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    Departament:{
        type: String,
        required: true
    },

    SKU:{
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    Details:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Products', PostSchema);
