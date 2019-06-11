import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Chat from './routes/Chat';
import Login from './routes/Login';
import Signup from './routes/Signup';

const theme = createMuiTheme({
	palette: {
		primary: { main: '#2962FF' },
		secondary: { main: '#FF9800' }
	}
});

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Switch>
					<Route path="/chat" component={Chat} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<Redirect to="/chat" />
				</Switch>
			</Router>
		</MuiThemeProvider>
	);
}

export default App;
