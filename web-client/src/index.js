import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { MuiThemeProvider } from 'material-ui/styles';

import App from './containers/app'

import registerServiceWorker from './modules/registerServiceWorker';
import theme from './modules/theme';
import store, { history } from './modules/store'

import 'typeface-roboto';
import './styles/index.css'

const target = document.querySelector('#root')

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>,
    target
)

registerServiceWorker();