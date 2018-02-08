import React from 'react';
import { Route, Link } from 'react-router-dom'
/*
 *  IMPORTED CONTAINERS
 */
import Home from '../home';
import Signup from '../signup';
import Login from '../login';
import Dashboard from '../dashboard';

const App = () => (
    <div>
        <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
        </main>
    </div>
);

export default App;