import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = theme => ({
    root: {

    },
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
/**********
 *  ACTIONS THIS COMPONENT NEEDS TO TAKE
 *      1. validate user input
 *      2. send out fetch.post => /users
 *      3. respond to fetch
 *             400 -> display erro to user
 *             200 -> route to greet as an authenticated user
 **********/  
class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            // Use standar error system
            error: {
                code: 0,
                text: '',
                lable: '',
                action: null
            }
        }
    }

    postForm = () => {

    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    validatePassword = (pwd1, pwd2) => {
        if (pwd1 !== pwd2) {
            this.setState({
                error: {
                    code: false,
                    text: 'Passwords are not identicle',
                    label: 'Confirm Passwords'
                }
            });
            return false;
        } else {
            this.setState({
                error: {
                    code: true,
                    text: '',
                    label: ''
                }
            });
            return true;
        }
    }

    validateEmail = () => {

    }

    onSignup = (form) => {
        const { username, email, password, confirmPassword } = this.state;
        const verified = this.validatePassword(password, confirmPassword);

        // validate input
        // dispatch action

        if(verified) {
            this.props.next();
        }
    };

    onCancel = () => {
        this.setState({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
        this.props.cancel();
    };

    render() {
        const { classes } = this.props;
        const { passwordError, error } = this.state;
        
        return (
            <div className={classes.root}>
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
                        id="email"
                        label="Email"
                        placeholder="example@gmail.com"
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        onChange={this.handleChange('email')}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        onChange={this.handleChange('password')}
                    />
                    <TextField
                        error={!error.valid}
                        helperText={error.text}
                        type="password"
                        id="confirmPassword"
                        label="Confirm Password"
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        onChange={this.handleChange('confirmPassword')}
                    />
                    <Button variant="raised" className={classes.button} onClick={this.onCancel}>Cancel</Button>
                    <Button variant="raised" className={classes.button} onClick={this.onSignup}>Signup!</Button>
                </form>
            </div>
        )
    }
}

export default withStyles(styles)(SignupForm);
