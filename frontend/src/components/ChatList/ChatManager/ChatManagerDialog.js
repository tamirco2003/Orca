import React, { useState } from 'react';
import { Dialog, Tabs, Tab } from '@material-ui/core';
import ChatJoiner from './ChatJoiner';
import ChatCreator from './ChatCreator';

function ChatDialog({ open, handleJoin, handleCreate, handleClose, ...rest }) {
    const [currentTab, setCurrentTab] = useState(0);

    return (
        <Dialog open={open} onClose={handleClose} {...rest}>
            <Tabs variant="fullWidth" value={currentTab} onChange={(e, v) => setCurrentTab(v)}>
                <Tab label="Join" />
                <Tab label="Create" />
            </Tabs>
            {currentTab === 0 && <ChatJoiner handleJoin={handleJoin} handleClose={handleClose} />}
            {currentTab === 1 && <ChatCreator handleCreate={handleCreate} handleClose={handleClose} />}
        </Dialog>
    )
}

export default ChatDialog;
