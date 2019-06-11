import React, { Component } from 'react';
import { Paper, Typography, withStyles, TextField, Button, Snackbar, SnackbarContent } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px 15px`,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background: theme.palette.primary.main,
        color: "white",
        borderRadius: "4px 4px 0px 0px"
    },
    form: {
        padding: `0px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    errorSnackbar: {
        backgroundColor: theme.palette.error.dark
    }
})

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                this.setState({ username: "", password: "" });
                return response.json();
            })
            .then(response => {
                if (response.error) {
                    throw new Error(response.error);
                }
                localStorage.setItem("token", response.token);
                this.props.history.push("/");
            })
            .catch((error) => this.setState({ error: error.message }));
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.main}>
                <Paper className={classes.paper}>
                    <div className={classes.header}>
                        <Typography variant="h5" color="inherit">Log In</Typography>
                    </div>
                    <Snackbar open={this.state.error} autoHideDuration={6000} onClose={() => this.setState({ error: "" })}>
                        <SnackbarContent className={classes.errorSnackbar} message={this.state.error} />
                    </Snackbar>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <TextField required fullWidth name="username" label="Username" value={this.state.username} onChange={this.handleChange} margin="normal" />
                        <TextField required fullWidth type="password" name="password" label="Password" value={this.state.password} onChange={this.handleChange} margin="normal" />
                        <Button fullWidth type="submit" variant="contained" color="primary" className={classes.submit}>Log In</Button>
                    </form>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(Login));
