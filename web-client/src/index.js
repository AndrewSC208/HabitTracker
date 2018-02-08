import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import App from './containers/app'
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider } from 'material-ui/styles';
import theme from './modules/theme';

import 'typeface-roboto';
import './index.css'

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