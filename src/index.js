import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import 'typeface-roboto';
import Reboot from 'material-ui/Reboot';
import { createMuiTheme } from 'material-ui/styles';
import { MuiThemeProvider } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#48a697',
      main: '#00796b',
      dark: '#004c40',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffc947',
      main: '#ff9800',
      dark: '#c66900',
      contrastText: '#000',
    },
  },
});

ReactDOM.render(
    <BrowserRouter>
        <Reboot>
            <MuiThemeProvider theme={theme}><App/></MuiThemeProvider>
        </Reboot>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
