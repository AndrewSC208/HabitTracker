import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class SignUpView extends Component {

    navToSignup = () => {
        this.props.toSignup();
    };

    navToLogin = () => {
        this.props.toLogin();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <h1>Home</h1>
                <Button variant="raised" className={classes.button} onClick={this.navToSignup}>Sign up</Button>
                <Button variant="raised" className={classes.button} onClick={this.navToLogin}>Login</Button>
            </div>
        )
    }
}

export default withStyles(styles)(SignUpView);