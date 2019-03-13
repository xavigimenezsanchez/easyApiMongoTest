const User = require('../models/user.model');

exports.user_create = function (req, res, next) {
    console.log(req.body);
    let user = new User(req.body);

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User Created successfully')
    })
};

exports.user_all = (req, res, next) => {
    User.find({}, (err,users) => {
        if (err) return next(err)
        res.send(users);
    });
}
exports.user_details = function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};

exports.user_update = function (req, res, next) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
        if (err) return next(err);
        res.send('Product ' + user._id + ' updated!');
    });
};

exports.user_delete = function (req, res, next) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send('Product ' + user._id + ' deleted successfully!');
    })
};

exports.user_zip = function (req, res, next) {
    User.aggregate([{$project: {city: "$address.city", zip: "$address.zip"}}, { $group: { _id: {$max: "$city"}, zip: {$max: "$zip"}}}])
        .then(  result => {res.send(result); },
                err => { next(err)});
};