module.exports.parse = (msg, prefix, callback = () => {}) => {
    const message = msg.content;
    if (!msg.author.bot && message.charAt(0) == prefix) callback(message.slice(prefix.length));
};