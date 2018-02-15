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
  
class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: {
                code: 0,
                text: '',
                lable: '',
                action: null
            }
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    validateInput = () => {

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
        const { username, password, email } = this.state;
        const { signup } = this.props;
        // todo: I need to validate user input:
        signup({username, password, email});
        // todo: on successful signup I need to route to dashboard
    };

    render() {
        const { classes } = this.props;
        const { error } = this.state;
        
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
                        error={error.code !== 0}
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
