// Model One-to-One Relationships with Embedded Documents

const mongoose = require('mongoose');
const Portfolio = require('./portfolio.model');
const PortfolioScenario = require('./portfolioScenario.model');
const Project = require('./project.model');
const Resource = require('./resource.model');
const Task = require('./task.model');

const Schema = mongoose.Schema;

let PortfolioAssignmentSchema = new Schema({
        PortfolioUID : {type: String, required: true},
        Portfolio: {type: Schema.Types.ObjectId, ref: "Portfolio"},
        ScenarioUID: {type: String, required: true},
        Scenario: {type: Schema.Types.ObjectId, ref: "PortfolioScenario"},
        AssignmentUID: {type: String, required: true},
        ProjectUID: {type: String, required: true},
        Project: {type: Schema.Types.ObjectId, ref: "Project"},
        TaskUID: {type: String, required: true},
        Task: {type: Schema.Types.ObjectId, ref: "Task"},
        ResourceUID: {type: String, required: true},
        Resource: {type: Schema.Types.ObjectId, ref: "Resource"},
        AssignmentID: {type: Number},
        Comment: {type: String, max: 2048},
        Start:   {type: Date },
        Finish:  {type: Date },
        CostRate: {type: Number},
        Created: {type: Date },
        Lastmodified: {type: Date },
        Lastmodifiedby: {type: String}
    });


PortfolioAssignmentSchema.post('validate', (doc, next) => {
    Project.findOne({UID: doc.ProjectUID}, (err,project) => {
                                            if (err) {
                                                next(err);
                                            }
                                            doc.Project = project._id;
                                            next();
                });
            }
    );
PortfolioAssignmentSchema.post('validate', (doc, next) => {
        Resource.findOne({UID: doc.ResourceUID}, (err,resource) => {
                                                if (err) {
                                                    next(err);
                                                }
                                                doc.Resource = resource._id;
                                                next();
                    });
                }
        );

PortfolioAssignmentSchema.post('validate', (doc, next) => {
        Task.findOne({UID: doc.TaskUID}, (err,task) => {
                                                if (err) {
                                                    next(err);
                                                }
                                                if (task){
                                                    /* for task with ID "00000000-0000-0000-0000-000000000000" */
                                                    doc.Task = task._id;
                                                }
                                                next();
                    });
                }
        );

PortfolioAssignmentSchema.post('validate', (doc, next) => {
    PortfolioScenario.findOne({ScenarioUID: doc.ScenarioUID}, (err,portfolioScenario) => {
                                                if (err) {
                                                    next(err);
                                                }
                                                doc.Scenario = portfolioScenario._id;
                                                next();
                    });
                }
        );

PortfolioAssignmentSchema.post('validate', (doc, next) => {
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
module.exports = mongoose.model('PortfolioAssignment', PortfolioAssignmentSchema);