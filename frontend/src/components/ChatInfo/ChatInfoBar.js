import React, { useState } from 'react'
import { AppBar, Toolbar, Avatar, Typography, Button } from '@material-ui/core';
import ChatInfo from './ChatInfo';

function ChatInfoBar({ chat, handleLeave, handleInfoChange, ...rest }) {
    const [dialog, setDialog] = useState(false);
    return (
        <>
            <AppBar position="static" color="default" elevation={0}>
                <Toolbar>
                    <Button style={{ margin: "10px", textTransform: "inherit" }} onClick={() => setDialog(true)}>
                        <Avatar style={{ backgroundColor: chat.color }} />
                        <Typography variant="subtitle1" style={{ paddingRight: "16px", paddingLeft: "16px", whiteSpace: "nowrap", overflow: "hidden" }}>{chat.name}</Typography>
                    </Button>
                </Toolbar>
            </AppBar>
            <ChatInfo open={dialog} handleClose={() => setDialog(false)} chat={chat} handleLeave={handleLeave} handleInfoChange={handleInfoChange} />
        </>
    )
}

export default ChatInfoBar;
