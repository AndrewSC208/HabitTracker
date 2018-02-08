import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
    root: {

    }
});

class DashboardView extends Component {
    onLogout = () => {
        this.props.toHome();
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <h1>Dashboard</h1>
                <Button variant="raised" className={classes.button} onClick={this.onLogout}>Logout</Button>
            </div>
        )
    }
}

export default withStyles(styles)(DashboardView);