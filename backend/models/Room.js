const mongoose = require("mongoose");
const Message = require("./Message");

let roomSchema = new mongoose.Schema({
    name: String,
    description: String,
    color: String,
    users: [mongoose.Schema.Types.ObjectId],
    messages: [Message.schema]
});

module.exports = mongoose.model("rooms", roomSchema);