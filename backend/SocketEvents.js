const jwt = require("jsonwebtoken");
const RoomController = require("./models/RoomController");

module.exports.validateConnection = (socket, next) => {
    jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new Error("Authentication error"));
        }

        socket.decoded = decoded;
        next();
    });
};

module.exports.handleConnection = (client) => {
    sendRoomstoClient(client);

    client.on("createGroup", (name, desc, color) => handleCreateGroup(client, name, desc, color));
    client.on("joinGroup", (id) => handleJoinGroup(client, id));
    client.on("leaveGroup", (id) => handleLeaveGroup(client, id));
    client.on("getMessages", (roomId) => handleGetMessages(client, roomId));
    client.on("sendMessage", (roomId, message) => handleSendMessage(client, roomId, message));
    client.on("enterRoom", (roomId) => handleEnterRoom(client, roomId));
    client.on("changeGroupInfo", (id, name, desc, color) => handleChangeGroupInfo(client, id, name, desc, color));
    client.on("getRooms", () => sendRoomstoClient(client));
};

function sendRoomstoClient(client) {
    RoomController.findRooms(client.decoded.sub, (err, res) => {
        client.emit("rooms", res);
        for (const room of res) {
            client.join(room._id);
        }
    });
}

function handleCreateGroup(client, name, desc, color) {
    RoomController.createRoom(name, desc, color, client.decoded.sub, () => {
        sendRoomstoClient(client);
    });
}

function handleJoinGroup(client, id) {
    RoomController.addUserToRoom(id, client.decoded.sub, () => {
        sendRoomstoClient(client);
    });
}

function handleLeaveGroup(client, id) {
    RoomController.removeUserFromRoom(id, client.decoded.sub, () => {
        client.leave(id);
        sendRoomstoClient(client);
    });
}

function handleGetMessages(client, roomId) {
    RoomController.getMessages(roomId, (err, res) => {
        client.emit("messages", res);
    });
}

function handleSendMessage(client, roomId, message) {
    RoomController.addMessageToRoom(roomId, client.decoded.sub, message, () => {
        RoomController.getMessages(roomId, (err, res) => {
            client.emit("messages", res);
            client.to("in_" + roomId).emit("messages", res);
        });
    });
}

function handleEnterRoom(client, roomId) {
    if (client.currentRoom) {
        client.leave(client.currentRoom);
    }
    client.join("in_" + roomId);
    client.currentRoom = "in_" + roomId;
}

function handleChangeGroupInfo(client, roomId, name, desc, color) {
    RoomController.changeRoomInfo(roomId, name, desc, color, () => {
        sendRoomstoClient(client);
        client.to(roomId).emit("getRooms");
    });
}