import React from 'react';
import { List, ListItem, Avatar, ListItemText } from '@material-ui/core';
import ChatListBar from './ChatListBar';

function ChatList({ handleJoin, handleCreate, chats, selected, setSelected, ...rest }) {
    return (
        <div {...rest}>
            <ChatListBar handleJoin={handleJoin} handleCreate={handleCreate} />
            <List>
                {
                    chats.map((value, index) =>
                        <ListItem key={index} button selected={selected === index} onClick={() => setSelected(index)}>
                            <Avatar style={{
                                backgroundColor: value.color,
                                margin: 10
                            }} />
                            <ListItemText primary={value.name} secondary={value.description} style={{ whiteSpace: "nowrap", overflow: "hidden" }} />
                        </ListItem>
                    )
                }
            </List>
        </div>
    )
}

export default ChatList;
