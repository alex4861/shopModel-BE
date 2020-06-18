const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    Id: {
      type: String,
      required: true  
    },
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
        required: false
    },
    Description:{
        type: String,
        required: false
    },
    Details:{
        type: String,
        required: false
    },
});

module.exports = mongoose.model('Post', PostSchema);
