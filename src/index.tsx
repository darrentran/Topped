import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Firebase, { FirebaseContext } from './Firebase/Database';
import { ToastProvider } from 'react-toast-notifications'
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#fff',
        },
        secondary: {
            main: '#2d2d2d',
            light: '#d2d2d2',
        },
        success: {
            main: '#92cbc5',
        },
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <FirebaseContext.Provider value={new Firebase()}>
            <ToastProvider>
                <App />
            </ToastProvider>
        </FirebaseContext.Provider>
    </MuiThemeProvider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
