const Task = require('../models/task.model');

exports.task_all = function (req, res) {
    Task.find(function (err, task) {
        if (err) return next(err);
        res.send(task);
    })
};

exports.task_all_populate = function (req, res) {
    Task.find()
        .populate('Project')
        .exec((err,task) => {
        if (err) return next(err);
        res.send(task);
    });
};