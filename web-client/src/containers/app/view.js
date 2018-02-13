import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
/*** IMPORTED CONTAINERS ***/
import Home from '../home';
import Signup from '../signup';
import Login from '../login';
import Dashboard from '../dashboard';
/*** GLOBAL COMPONENTS ***/
//import { SnackBar } from '../../modules/components/SnackBar';
/*** APP STYLES ***/
const styles = theme => ({
    root: {
        width: '100vw',
        height: '100vh'
    }
});
class AppView extends Component {
    
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <main>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/dashboard" component={Dashboard} />
                </main>
            </div>
        )
    }
}

export default withStyles(styles)(AppView);