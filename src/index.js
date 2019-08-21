import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { BrowserRouter as Router } from "react-router-dom";

import colors from './styles/colors'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.main,
  },
})

ReactDOM.render(
  <Router>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App/>
    </MuiThemeProvider>
  </Router>
  , document.getElementById('root'))

serviceWorker.unregister();
