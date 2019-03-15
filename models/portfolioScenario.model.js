// Model One-to-One Relationships with Embedded Documents

const mongoose = require('mongoose');
const User = require('./user.model');
const Portfolio = require('./portfolio.model');
const Schema = mongoose.Schema;

let PortfolioScenarioSchema = new Schema({
        PortfolioUID : {type: String, required: true},
        Portfolio: {type: Schema.Types.ObjectId, ref: "Portfolio"},
        ScenarioUID: {type: String, required: true, unique: true },
        ScenarioName: {type: String, required: true, max: 255 },
        Created: {type: Date },
        Lastmodified: {type: Date },
        Lastmodifiedby: {type: String},
        OwnerUID: {type: String},
        Owner: {type: Schema.Types.ObjectId, ref: "User"},
        CheckedOut: {type: Date },
        CheckedOutBy: {type: String},
        CheckedOutByUser: {type: Schema.Types.ObjectId, ref: "User"},
        Comment: {type: String, max: 80},
    });


PortfolioScenarioSchema.post('validate', (doc, next) => {
    User.findOne({UID: doc.OwnerUID}, (err,user) => {
                                            if (err) {
                                                next(err);
                                            }
                                            doc.Owner = user._id;
                                            next();
                });
            }
    );


PortfolioScenarioSchema.post('validate', (doc, next) => {
        User.findOne({UID: doc.CheckedOutBy}, (err,user) => {
                                                if (err) {
                                                    next(err);
                                                }
                                                doc.CheckedOutByUser = user._id;
                                                next();
                    });
                }
        );

PortfolioScenarioSchema.post('validate', (doc, next) => {
    Portfolio.findOne({PortfolioUID: doc.PortfolioUID}, (err,portfolio) => {
                                            if (err) {
                                                next(err);
                                            }
                                            doc.Portfolio = portfolio._id;
                                            next();
                });
            }
    );
// Export the model
module.exports = mongoose.model('PortfolioScenario', PortfolioScenarioSchema);