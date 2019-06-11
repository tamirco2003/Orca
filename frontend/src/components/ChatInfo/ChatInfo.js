import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogTitle, TextField, DialogActions, Button } from '@material-ui/core';

function ChatInfo({ open, handleClose, chat, handleInfoChange, handleLeave, ...rest }) {
    const [groupName, setGroupName] = useState("");
    const [groupDesc, setGroupDesc] = useState("");
    const [groupColor, setGroupColor] = useState("");

    useEffect(() => {
        setGroupName(chat.name);
        setGroupDesc(chat.description);
        setGroupColor(chat.color);
    }, [chat, open])

    return (
        <Dialog open={open} onClose={handleClose} {...rest}>
            <DialogContent>
                <DialogTitle>Group Info</DialogTitle>
                <TextField required fullWidth value={groupName} onChange={e => setGroupName(e.target.value)} label="Group Name" margin="normal" />
                <TextField fullWidth value={groupDesc} onChange={e => setGroupDesc(e.target.value)} label="Group Description" margin="normal" />
                <TextField fullWidth value={groupColor} onChange={e => setGroupColor(e.target.value)} label="Group Color (#FFFFFF format, leave blank for random color)" margin="normal" />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()}>Cancel</Button>
                <Button onClick={() => { handleInfoChange(chat._id, groupName, groupDesc, groupColor); handleClose(); }}>Done</Button>
                <Button onClick={() => { handleLeave(chat._id); handleClose(); }}>Leave Group</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ChatInfo;
