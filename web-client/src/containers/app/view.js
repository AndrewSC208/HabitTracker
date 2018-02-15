import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
/*** IMPORTED CONTAINERS ***/
import Home      from '../home';
import Signup    from '../signup';
import Login     from '../login';
import Dashboard from '../dashboard';
/*** GLOBAL COMPONENTS ***/
/*** APP STYLES ***/
const styles = theme => ({
    root: {
        width: '100vw',
        height: '100vh'
    }
});
class AppView extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <main>
                    <Route exact path="/" component={Home} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route path="/dashboard" component={Dashboard} />
                </main>
            </div>
        )
    }
}

export default withStyles(styles)(AppView);