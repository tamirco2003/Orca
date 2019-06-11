const mongoose = require("mongoose");

let messageSchema = new mongoose.Schema({
    sender: String,
    date: Date,
    body: String
});

module.exports = mongoose.model("messages", messageSchema);