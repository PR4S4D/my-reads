import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import 'typeface-roboto';
import Reboot from 'material-ui/Reboot';
import Button from 'material-ui/Button';

ReactDOM.render(
    <BrowserRouter>
        <Reboot>
            <App />
        </Reboot>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();
