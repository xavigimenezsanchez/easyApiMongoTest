// Model One-to-One Relationships with Embedded Documents

const mongoose = require('mongoose');
const Portfolio = require('./portfolio.model');
const PortfolioScenario = require('./portfolioScenario.model');
const Assignment = require('./portfolioAssignment.model');

const Schema = mongoose.Schema;

let PortfolioTimephasedDataSchema = new Schema({
        PortfolioUID : {type: String, required: true},
        Portfolio: {type: Schema.Types.ObjectId, ref: "Portfolio"},
        ScenarioUID: {type: String, required: true},
        Scenario: {type: Schema.Types.ObjectId, ref: "PortfolioScenario"},
        AssignmentUID: {type: String, required: true},
        Assignment: {type: Schema.Types.ObjectId, ref: "Assignment"},
        PeriodText: {type: String, required: true, max: 16},
        PeriodStart:   {type: Date },
        Week: {type: Number},
        Month: {type: Number},
        Quarter: {type: Number},
        Year: {type: Number},
        PeriodTypeID: {type: Number},
        Work: {type: Number},
        Cost: {type: Number},
        FTE: {type: Number},
        ActualWork: {type: Number},
        ActualCost: {type: Number},
        ActualFTE: {type: Number}
    });


PortfolioTimephasedDataSchema.post('validate', (doc, next) => {
    Assignment.findOne({AssignmentUID: doc.AssignmentUID}, (err,assignment) => {
                                            if (err) {
                                                next(err);
                                            }
                                            doc.Assignment = assignment._id;
                                            next();
                });
            }
    );
PortfolioTimephasedDataSchema.post('validate', (doc, next) => {
    PortfolioScenario.findOne({ScenarioUID: doc.ScenarioUID}, (err,portfolioScenario) => {
                                                if (err) {
                                                    next(err);
                                                }
                                                doc.Scenario = portfolioScenario._id;
                                                next();
                    });
                }
        );

PortfolioTimephasedDataSchema.post('validate', (doc, next) => {
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
module.exports = mongoose.model('PortfolioTimephasedData', PortfolioTimephasedDataSchema);