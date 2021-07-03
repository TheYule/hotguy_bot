const parse = (message, prefix, callback = () => {}) => {
    if (message.charAt(0) == prefix) {
        callback(message.toString().slice(1));
    }
};

module.exports.parse = (message, prefix, callback) => {
    return parse(message, prefix, callback);
};