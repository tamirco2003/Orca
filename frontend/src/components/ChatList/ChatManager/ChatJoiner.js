import React, { useState } from 'react';
import { DialogTitle, DialogContent, DialogContentText, TextField, Button, DialogActions } from '@material-ui/core';

function ChatJoiner({ handleClose, handleJoin }) {
    const [groupId, setGroupId] = useState("");

    return (
        <>
            <DialogTitle>Join a Group</DialogTitle>
            <DialogContent>
                <DialogContentText>Enter the group ID of the group you would like to join.</DialogContentText>
                <TextField autoFocus fullWidth value={groupId} onChange={e => setGroupId(e.target.value)} label="Group ID" margin="normal" />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()}>Cancel</Button>
                <Button onClick={() => { handleJoin(groupId); handleClose(); }}>Join</Button>
            </DialogActions>
        </>
    )
}

export default ChatJoiner;
