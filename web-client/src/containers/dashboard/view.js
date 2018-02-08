import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {

    }
});

class DashboardView extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <h1>Dashboard</h1>
            </div>
        )
    }
}

export default withStyles(styles)(DashboardView);