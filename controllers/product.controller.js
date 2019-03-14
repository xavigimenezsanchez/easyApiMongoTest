const Product = require('../models/product.model');

exports.product_create = function (req, res, next) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product ' + product._id + ' updated!');
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send('Product ' + product._id + ' deleted successfully!');
    })
};

/**
 * Map-Reduce examples
 * https://github.com/Automattic/mongoose/blob/master/examples/mapreduce/mapreduce.js
 */
let o = {
    map: function() {
        emit(this.type, this.price);
    },
    reduce: function(id, prices) {
        return Array.sum(prices);
    },
    verbose: true
};

exports.product_SumPrices = function (req, res, next) {
    Product.mapReduce(o, function(err, results, stats) {
        if (err) {
            next(err);
        }
        res.send(results);
        console.log(stats);
    })
};