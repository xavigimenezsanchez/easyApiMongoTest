// Model One-to-One Relationships with Embedded Documents

const mongoose = require('mongoose');
const Portfolio = require('./portfolio.model');
const PortfolioScenario = require('./portfolioScenario.model');
const Project = require('./project.model');
const Schema = mongoose.Schema;

let PortfolioProjectSchema = new Schema({
        PortfolioUID : {type: String, required: true},
        Portfolio: {type: Schema.Types.ObjectId, ref: "Portfolio"},
        ScenarioUID: {type: String, required: true},
        Scenario: {type: Schema.Types.ObjectId, ref: "PortfolioScenario"},
        ProjectUID: {type: String, required: true},
        Project: {type: Schema.Types.ObjectId, ref: "Project"},
        Start:   {type: Date },
        Finish:  {type: Date },
        IsPortfolioProject: {type: Boolean},
        Active: {type: Boolean},
        Lastmodified: {type: Date },
        Lastmodifiedby: {type: String},
        Comment: {type: String, max: 2048},
        Created: {type: Date }
    });


PortfolioProjectSchema.post('validate', (doc, next) => {
    Project.findOne({UID: doc.ProjectUID}, (err,project) => {
                                            if (err) {
                                                next(err);
                                            }
                                            doc.Project = project._id;
                                            next();
                });
            }
    );


PortfolioProjectSchema.post('validate', (doc, next) => {
    PortfolioScenario.findOne({ScenarioUID: doc.ScenarioUID}, (err,portfolioScenario) => {
                                                if (err) {
                                                    next(err);
                                                }
                                                doc.Scenario = portfolioScenario._id;
                                                next();
                    });
                }
        );

PortfolioProjectSchema.post('validate', (doc, next) => {
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
module.exports = mongoose.model('PortfolioProject', PortfolioProjectSchema);