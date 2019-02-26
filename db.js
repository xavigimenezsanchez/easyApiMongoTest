var mongoose = require('mongoose');
var db = mongoose.connection;

const url = 'mongodb://localhost:27017/';

// Database Name
const dbName = 'test';

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Db connect')
})

function connect () {
    mongoose.set('useFindAndModify', false);
    mongoose.connect(url + dbName);
    mongoose.Promise = global.Promise;
}
module.exports = connect;