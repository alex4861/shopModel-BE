const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Departaments', PostSchema);
