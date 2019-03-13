// Model One-to-One Relationships with Embedded Documents

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ResourceSchema = new Schema({
        UID : {type: String, required: true, unique: true },
        Name: {type: String, required: true, max: 255 },
        Email: {type: String, max: 255 },
        ResourceTypeId: {type: Number},
        ExternalUID: {type: String, max: 80},
        Comment: {type: String, max: 80},
        RBS: {type: String, max: 4000},
        IsGeneric: {type: Boolean},
        Created: {type: Date },
        Lastmodified: {type: Date },
        Lastmodifiedby: {type: String}
    });




// Export the model
module.exports = mongoose.model('Resource', ResourceSchema);