// Model One-to-One Relationships with Embedded Documents

const mongoose = require('mongoose');
const User = require('./user.model');
const Schema = mongoose.Schema;

let PortfolioSchema = new Schema({
        PortfolioUID : {type: String, required: true, unique: true },
        Name: {type: String, required: true, max: 255 },
        OwnerUID: {type: String},
        Owner: {type: Schema.Types.ObjectId, ref: "User"},
        CurrencyUID: {type: String},
        Start:   {type: Date },
        Finish:  {type: Date },
        Comment: {type: String, max: 80},
        Created: {type: Date },
        Lastmodified: {type: Date },
        Lastmodifiedby: {type: String}
    });


PortfolioSchema.post('validate', (doc, next) => {
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
module.exports = mongoose.model('Portfolio', PortfolioSchema);