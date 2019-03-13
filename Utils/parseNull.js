var parseNull = function(object) {
    for (prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (object[prop] === "NULL") {
                delete object[prop];
            }
        }
    }
    return object;
}

module.exports = parseNull;