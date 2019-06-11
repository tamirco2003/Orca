import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

export class ProtectedRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            done: false,
            verified: false
        }
    }

    componentDidMount() {
        fetch("/checkToken", {
            method: "POST",
            body: JSON.stringify({ token: localStorage.getItem("token") }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((response) => this.setState({ done: true, verified: response.verified }));
    }

    render() {
        let { component: Component, ...rest} = this.props;
        return <Route {...rest} render={props => {
            if (!this.state.done) {
                return null;
            }
            if (!this.state.verified) {
                return <Redirect to="/login" />
            }
            return <Component {...props} />
        }} />
    }
}

export default ProtectedRoute
