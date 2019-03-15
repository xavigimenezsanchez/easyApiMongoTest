// Model One-to-One Relationships with Embedded Documents

const mongoose = require('mongoose');
const Portfolio = require('./portfolio.model');
const PortfolioScenario = require('./portfolioScenario.model');
const Resource = require('./resource.model');
const Schema = mongoose.Schema;

let PortfolioResourceSchema = new Schema({
        PortfolioUID : {type: String, required: true},
        Portfolio: {type: Schema.Types.ObjectId, ref: "Portfolio"},
        ScenarioUID: {type: String, required: true},
        Scenario: {type: Schema.Types.ObjectId, ref: "PortfolioScenario"},
        ResourceUID: {type: String, required: true},
        Resource: {type: Schema.Types.ObjectId, ref: "Resource"},
        Comment: {type: String, max: 2048},
        Created: {type: Date },
    });


PortfolioResourceSchema.post('validate', (doc, next) => {
    Resource.findOne({UID: doc.ResourceUID}, (err,resource) => {
                                            if (err) {
                                                next(err);
                                            }
                                            doc.Resource = resource._id;
                                            next();
                });
            }
    );


PortfolioResourceSchema.post('validate', (doc, next) => {
    PortfolioScenario.findOne({ScenarioUID: doc.ScenarioUID}, (err,portfolioScenario) => {
                                                if (err) {
                                                    next(err);
                                                }
                                                doc.Scenario = portfolioScenario._id;
                                                next();
                    });
                }
        );

PortfolioResourceSchema.post('validate', (doc, next) => {
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
module.exports = mongoose.model('PortfolioResource', PortfolioResourceSchema);