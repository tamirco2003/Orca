import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Button, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ChatDialog from './ChatManager/ChatManagerDialog';

const styles = theme => ({
	toolbar: {
        justifyContent: "space-between"
    }
});

function ChatListBar({classes, handleJoin, handleCreate, ...rest}) {
    const [dialog, setDialog] = useState(false);
    return (
        <>
            <AppBar position="static" color="default" elevation={0}>
                <Toolbar className={classes.toolbar}>
                    <IconButton onClick={() => setDialog(true)}>
                        <AddIcon />
                    </IconButton>
                    <Button onClick={() => {localStorage.removeItem("token"); window.location.reload();}}>Log Out</Button>
                </Toolbar>
            </AppBar>
            <ChatDialog open={dialog} handleJoin={handleJoin} handleCreate={handleCreate} handleClose={() => setDialog(false)} />
        </>
    )
}

export default withStyles(styles)(ChatListBar);
