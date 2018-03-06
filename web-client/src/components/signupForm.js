import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import { checkPassword, checkEmail } from '../modules/utils/validateInput';

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
  
class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: {
                code: 5,
                text: '',
                lable: '',
                action: null
            }
        }
    }

    handleChange = name => event => {
        const { username, email, password, confirmPassword } = this.state;

        let error = {
            code: 0,
            text: '',
            label: '',
            action: null
        }
        // TODO: Fix this validation, enable button when input is full and valid:
        if (username.length < 1 && email.length < 1 && password.length < 1 && confirmPassword.length < 1) {
            error = {
                code: 5,
                text: 'Some input fields are empty',
                label: '',
                action: null
            }
        }

        this.setState({
            error,
            [name]: event.target.value,
        });
    };

    validateInput = () => {
        const { email, password, confirmPassword } = this.state;

        const passwordError = checkPassword(password, confirmPassword);

        if (passwordError.code !== 0) {
            this.setState({
                error: passwordError
            });
        }

        const emailError = checkEmail(email);

        if (emailError.code !== 0 ) {
            this.setState({
                error: emailError
            });
        };
    }

    onCancel = () => {
        this.setState({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
        this.props.cancel();
    };

    onSignup = () => {
        const { username, password, email, error } = this.state;
        const { signup, next } = this.props;

        this.validateInput();
        
        if (error.code === 0) {
            signup({ username, password, email });
        }

        if(error.code === 0) {
            next();
        } else {
            // TODO: display signup error to user
        }
    };

    render() {
        const { classes } = this.props;
        const { error } = this.state;
        
        return (
            <div>
                <form className={classes.formContainer} noValidate autoComplete="off">
                    <TextField
                        id="username"
                        label="Username"
                        placeholder="Friend1234"
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        onChange={this.handleChange('username')}
                    />
                    <TextField
                        error={error.code === 3}
                        helperText={error.code === 3 ? error.label : ''}
                        id="email"
                        label="Email"
                        placeholder="example@gmail.com"
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        onChange={this.handleChange('email')}
                    />
                    <TextField
                        error={error.code === 1 || error.code === 2}
                        helperText={error.label}
                        id="password"
                        label="Password"
                        type="password"
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        onChange={this.handleChange('password')}
                    />
                    <TextField
                        error={error.code === 1 || error.code === 2}
                        helperText={error.code === 1 || error.code === 2 ? error.label : ''}
                        type="password"
                        id="confirmPassword"
                        label="Confirm Password"
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        onChange={this.handleChange('confirmPassword')}
                    />
                    <Button variant="raised" className={classes.button} onClick={this.onCancel}>Cancel</Button>
                    <Button variant="raised" className={classes.button} onClick={this.onSignup} disable={error.code === 0 ? 'true' : 'false'}>Signup!</Button>
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(SignupForm);
