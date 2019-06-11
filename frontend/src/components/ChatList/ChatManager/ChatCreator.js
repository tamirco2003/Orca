import React, { useState } from 'react';
import { DialogTitle, DialogContent, DialogContentText, TextField, Button, DialogActions } from '@material-ui/core';

function ChatCreator({ handleClose, handleCreate }) {
    const [groupName, setGroupName] = useState("");
    const [groupDesc, setGroupDesc] = useState("");
    const [groupColor, setGroupColor] = useState("");

    return (
        <>
            <DialogTitle>Create a Group</DialogTitle>
            <DialogContent>
                <DialogContentText>Enter the new group's name, description, and color.</DialogContentText>
                <TextField required fullWidth value={groupName} onChange={e => setGroupName(e.target.value)} label="Group Name" margin="normal" />
                <TextField fullWidth value={groupDesc} onChange={e => setGroupDesc(e.target.value)} label="Group Description" margin="normal" />
                <TextField fullWidth value={groupColor} onChange={e => setGroupColor(e.target.value)} label="Group Color (#FFFFFF format, leave blank for random color)" margin="normal" />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()}>Cancel</Button>
                <Button onClick={() => { handleCreate(groupName, groupDesc, groupColor); handleClose(); }}>Create</Button>
            </DialogActions>
        </>
    )
}

export default ChatCreator;
