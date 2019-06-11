const User = require("./User");

module.exports.getUsername = (userId, callback) => {
    User.findById(userId, "username", callback);
};