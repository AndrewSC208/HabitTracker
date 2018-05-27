import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import LoginForm from '../../components/loginForm';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    }
});

class LoginView extends Component {

    render() {
        const { classes, toDashboard, toHome, loginUserReq } = this.props;
        
        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <LoginForm next={toDashboard} cancel={toHome} login={loginUserReq}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(LoginView);