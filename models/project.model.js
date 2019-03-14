// Model One-to-One Relationships with Embedded Documents

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProjectSchema = new Schema({
        UID : {type: String, required: true, unique: true },
        Name: {type: String, required: true, max: 255 },
        Start:   {type: Date },
        Finish:  {type: Date },
        ExternalUID: {type: String, max: 80},
        Comment: {type: String, max: 80},
        Active: {type: Boolean },
        Tasks: {type: [Schema.Types.ObjectId], ref: "Task", required: true, default:[]},
        CheckedOut: {type: Date },
        CheckedOutBy: {type: String},
        LastCalculated: {type: Date },
        Created: {type: Date },
        Lastmodified: {type: Date },
        Lastmodifiedby: {type: String}
    });




// Export the model
module.exports = mongoose.model('Project', ProjectSchema);