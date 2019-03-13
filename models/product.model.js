const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    type: {type: String, required: true, enum:['A','B','C']},
    price: {type: Number, required: true},
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);