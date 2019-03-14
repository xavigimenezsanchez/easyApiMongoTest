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
    UID : {type: String, required: true, unique: true },
    Name: {type: String, required: true, max: 255},
    Email: {type: String, required: true, max: 255},
    WindowsLogin: {type: String, required: true, max: 255},
    ExternalUID: {type: String, max: 80},
    address: AddressSchema,
    LastUserLogin: {type: Date },
    Created: {type: Date },
    Lastmodified: {type: Date },
    Lastmodifiedby: {type: String}
});


// Export the model
module.exports = mongoose.model('User', UserSchema);