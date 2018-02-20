import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = theme => ({
    formContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: {
                code: 5,
                text: '',
                lable: '',
                action: null
            }
        }
    }

    handleChange = name => event => {
        
        let error = {
            code: 0,
            text: '',
            label: '',
            action: null
        }

        this.setState({
            error,
            [name]: event.target.value,
        });
    };

    onLogin = () => {
        const { username, password, error } = this.state;
        const { login } = this.props;
    
        // this.validateInput();

        if(error.code === 0) {
            login({ username, password });
        }

        // TODO
        // if(error.code === 0) {
        //     next();
        // } else {
        //     // TODO: display login error to user
        // }
    };

    onCancel = () => {
        this.setState({
            username: '',
            password: '',
        })

        this.props.cancel();
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <form className={classes.formContainer} noValidate autoComplete="off">
                    <TextField
                        id="username"
                        label="Email"
                        placeholder="friend@test.com"
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        onChange={this.handleChange('username')}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        onChange={this.handleChange('password')}
                    />
                    <Button variant="raised" className={classes.button} onClick={this.onCancel}>Cancel</Button>
                    <Button variant="raised" className={classes.button} onClick={this.onLogin}>Login</Button>
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(LoginForm);
