const Room = require("./Room");

const UserController = require("./UserController");

module.exports.createRoom = (name, description, color, userId, callback) => {
    if (!/^#[0-9A-F]{6}$/i.test(color)) {
        color = "#";
        let letters = '0123456789ABCDEF';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
    }
    new Room({
        name,
        description,
        color,
        users: [userId],
        messages: []
    }).save(callback);
};

module.exports.addUserToRoom = (roomId, userId, callback) => {
    Room.updateOne({ _id: roomId }, { $addToSet: { users: userId } }, callback);
};

module.exports.removeUserFromRoom = (roomId, userId, callback) => {
    Room.updateOne({ _id: roomId }, { $pull: { users: userId } }, callback);
};

module.exports.findRooms = (userId, callback) => {
    Room.find({ users: userId }, "_id name description color", callback);
};

module.exports.addMessageToRoom = (roomId, userId, message, callback) => {
    UserController.getUsername(userId, (err, res) => {
        Room.updateOne({ _id: roomId }, {
            $push: {
                messages: {
                    $each: [{
                        sender: res.username,
                        date: new Date(),
                        body: message
                    }],
                    $position: 0
                }
            }
        }, callback);
    });
};

module.exports.getMessages = (roomId, callback) => {
    Room.findById(roomId, "messages", callback);
};

module.exports.changeRoomInfo = (roomId, name, description, color, callback) => {
    if (!/^#[0-9A-F]{6}$/i.test(color)) {
        Room.updateOne({ _id: roomId }, {
            name,
            description
        }, callback);
        
        return;
    }

    Room.updateOne({ _id: roomId }, {
        name,
        description,
        color
    }, callback);
};