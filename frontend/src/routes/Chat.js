import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Paper, withStyles } from '@material-ui/core';
import ChatList from '../components/ChatList/ChatList';
import ChatView from '../components/ChatView';
import io from "socket.io-client";
import LoadingAnim from '../components/LoadingAnim';

const styles = theme => ({
	mainPaper: {
		width: 'auto',
		margin: theme.spacing.unit * 3,
		padding: 0,
		display: "flex",
		height: "calc(100vh - 48px)",
	},
	chatList: {
		width: "25%",
		height: "100%",
		borderRight: "1px solid #BBB",
		overflowY: "auto"
	}
});

let socket;
class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: null,
			chats: null,
			messages: [],
			currentMessage: ""
		}

		this.setSelected = this.setSelected.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.setCurrentMessage = this.setCurrentMessage.bind(this);
	}

	setSelected(num) {
		this.setState({
			selected: num,
			messages: []
		})
	}

	componentDidMount() {
		socket = io({
			query: {
				token: localStorage.getItem("token")
			}
		});

		socket.on("error", (err) => {
			if (err === "Authentication error") {
				this.props.history.push("/login");
			}
		});

		socket.on("rooms", (rooms) => {
			this.setState({
				chats: rooms
			})
		})

		socket.on("messages", (room) => {
			this.setState({
				messages: room.messages
			})
		})

		socket.on("getRooms", () => {
			socket.emit("getRooms");
		})
	}

	handleJoin(groupId) {
		socket.emit("joinGroup", groupId);
	}

	handleCreate(groupName, groupDesc, groupColor) {
		socket.emit("createGroup", groupName, groupDesc, groupColor);
	}
	
	handleLeave(groupId) {
		socket.emit("leaveGroup", groupId);
	}

	handleGroupInfo(groupId, groupName, groupDesc, groupColor) {
		socket.emit("changeGroupInfo", groupId, groupName, groupDesc, groupColor);
	}

	enterRoom(chatId) {
		socket.emit("enterRoom", chatId);
	}

	getMessages(chatId) {
		socket.emit("getMessages", chatId);
	}

	setCurrentMessage(str) {
		this.setState({
			currentMessage: str
		})
	}

	sendMessage() {
		socket.emit("sendMessage", this.state.chats[this.state.selected]._id, this.state.currentMessage);
	}

	render() {
		const { classes } = this.props;
		return (
			<Paper className={classes.mainPaper}>
				{this.state.chats ?
					<>
						<ChatList className={classes.chatList} handleJoin={this.handleJoin} handleCreate={this.handleCreate} chats={this.state.chats} selected={this.state.selected} setSelected={this.setSelected} />
						<ChatView chat={this.state.chats[this.state.selected]} messages={this.state.messages} enterRoom={this.enterRoom} getMessages={this.getMessages} currentMessage={this.state.currentMessage} setCurrentMessage={this.setCurrentMessage} sendMessage={this.sendMessage} handleLeave={this.handleLeave} handleInfoChange={this.handleGroupInfo} />
					</>
					: <LoadingAnim />
				}
			</Paper>
		)
	}
}

export default withStyles(styles)(withRouter(Chat));
