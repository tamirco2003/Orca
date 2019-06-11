require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

const User = require("./models/User");

const SocketEvents = require("./SocketEvents");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));

// app.get("/*"", function(req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

io.use(SocketEvents.validateConnection).on("connection", SocketEvents.handleConnection);

app.post("/signup", (request, result) => {
	User.find({ username: request.body.username.toLowerCase() }, (err, res) => {
		if (res.length > 0) {
			return result.send({ error: "User already exists." });
		}
		bcrypt.hash(request.body.password, 10, (error, hash) => {
			new User({
				username: request.body.username.toLowerCase(),
				password: hash,
			}).save();
		});
	});
});

app.post("/login", (request, result) => {
	User.findOne({ username: request.body.username.toLowerCase() }, (err, res) => {
		if (!res) {
			return result.send({ error: "Invalid username or password." });
		}

		bcrypt.compare(request.body.password, res.password, (error, same) => {
			if (same) {
				const token = jwt.sign({ sub: res._id, iat: Date.now() }, process.env.JWT_SECRET);
				return result.send({ token });
			}
			return result.send({ error: "Invalid username or password." });
		});
	});
});

process.on("SIGINT", () => {
	mongoose.connection.close()
		.then(console.log("MongoDB connection closed."));
});

server.listen(3001);
