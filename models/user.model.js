// Model One-to-One Relationships with Embedded Documents

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AddressSchema = new Schema({
    street: {type: String},
    city:   {type: String},
    state:  {type: String},
    zip:    {type: String}
});

let UserSchema = new Schema({
    name: {type: String, required: true, max: 100},
    surname: {type: String, required: true, max: 200},
    address: AddressSchema
});


// Export the model
module.exports = mongoose.model('User', UserSchema);