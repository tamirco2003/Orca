import React from 'react'
import { Paper, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
    msgPaper: {
    // minWidth: "250px",
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2
    },
    msgSender: {
        // padding: theme.spacing.unit * 2
    },
    msgBody: {
        // padding: theme.spacing.unit * 3
        whiteSpace: "pre-line"
    }
})

function Message({ classes, sender, body, ...rest }) {
    return (
        <Paper className={classes.msgPaper} {...rest}>
            <Typography className={classes.msgSender} variant="subtitle2">{sender}</Typography>
            <Typography className={classes.msgBody} variant="body1">{body}</Typography>
        </Paper>
    )
}

export default withStyles(styles)(Message);
