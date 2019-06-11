import React, { useEffect } from 'react';
import { withStyles, TextField, IconButton } from '@material-ui/core';
import Message from './Message';
import SendIcon from '@material-ui/icons/Send';
import ChatInfoBar from './ChatInfo/ChatInfoBar';

const styles = theme => ({
    viewContainer: {
        display: "flex",
        flexDirection: "column-reverse",
        justifyContent: "space-between",
        width: "75%"
    },
    messageList: {
        display: "flex",
        flexDirection: "column-reverse",
        overflowY: "auto",
        width: "100%",
        padding: "8px",
        flexGrow: 1,
    },
    messageSender: {
        display: "flex",
        padding: theme.spacing.unit
    },
    messageSubmit: {
        margin: theme.spacing.unit
    },
    messageTextbox: {
        maxHeight: "100px",
        overflowY: "auto"
    }
});

function ChatView({ classes, chat, messages, enterRoom, getMessages, currentMessage, setCurrentMessage, sendMessage, handleLeave, handleInfoChange, ...rest }) {

    useEffect(() => {
        if (chat) {
            enterRoom(chat._id);
            getMessages(chat._id);
        }
    }, [chat]);

    return (
        <div className={classes.viewContainer}>
            {chat &&
                <form name="messageSender" className={classes.messageSender} onSubmit={(e) => { e.preventDefault(); sendMessage(); setCurrentMessage(""); }}>
                    <TextField className={classes.messageTextbox} multiline name="message" label="Enter a message..." fullWidth value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} onKeyPress={(e) => {
                        if (e.which === 13 && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                            setCurrentMessage("");
                        }
                    }} />
                    <IconButton type="submit">
                        <SendIcon />
                    </IconButton>
                </form>}
            <div className={classes.messageList}>
                {messages &&
                    messages.map((value, index) =>
                        <Message key={index} sender={value.sender} body={value.body} />
                    )
                }
            </div>
            {chat && <ChatInfoBar chat={chat} handleLeave={handleLeave} handleInfoChange={handleInfoChange} />}
        </div>
    )
}

export default withStyles(styles)(ChatView);
