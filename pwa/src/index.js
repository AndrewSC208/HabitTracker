import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { MuiThemeProvider } from 'material-ui/styles';
import { Route } from 'react-router';

import theme from './modules/theme';
import registerServiceWorker from './modules/registerServiceWorker';
import store, { history } from './store'

import Home       from './containers/home'
import Signup     from './containers/signup'
import Login      from './containers/login'
import Dashboard  from './containers/dashboard'

import 'typeface-roboto';
import './styles/index.css'

const target = document.querySelector('#root')

render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <ConnectedRouter history={history}>
                <div>
                    <main>
                        <Route exact path="/" component={Home} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/login" component={Login} />
                        <Route path="/dashboard" component={Dashboard} />
                    </main>
                </div>
            </ConnectedRouter>
        </MuiThemeProvider>
    </Provider>,
    target
)

registerServiceWorker();