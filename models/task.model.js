// Model One-to-One Relationships with Embedded Documents

const mongoose = require('mongoose');
const Project = require('./project.model');
const User = require('./user.model');
const Schema = mongoose.Schema;

let TaskSchema = new Schema({
        UID : {type: String, required: true, unique: true },
        Name: {type: String, required: true, max: 255 },
        ProjectUID: {type: String, max: 80},
        Project: {type: Schema.Types.ObjectId, ref: "Project", required: true },
        OwnerUID: {type: String},
        Owner: {type: Schema.Types.ObjectId, ref: "User"},
        Start:   {type: Date },
        Finish:  {type: Date },
        costRate: {type: Number},
        WBS: {type: String, max: 4000},
        IsProjectSummary: {type: Boolean },
        IsSummary: {type: Boolean },
        ParentUID: {type: String, max: 80},
        Parent: {type: Schema.Types.ObjectId, ref: "Task" },
        Level: {type: Number},
        ID: {type: Number},
        ExternalUID: {type: String, max: 80},
        Comment: {type: String, max: 80},
        Active: {type: Boolean },
        IsLocked: {type: Boolean },
        CheckedOut: {type: Date },
        CheckedOutBy: {type: String},
        Created: {type: Date },
        Lastmodified: {type: Date },
        Lastmodifiedby: {type: String}
    });

TaskSchema.post('save', (doc) => Project.findOneAndUpdate({_id: doc.Project}, {$push: {Tasks: doc._id}}));
TaskSchema.post('validate', (doc, next) => {
    User.findOne({UID: doc.OwnerUID}, (err,user) => {
                                            if (err) {
                                                next(err);
                                            }
                                            doc.Owner = user._id;
                                            next();
                });
            }
    );


// Export the model
module.exports = mongoose.model('Task', TaskSchema);