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
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
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

    signupPost = () => {
        const { username, password, email } = this.state;
        const url = `http://localhost:4112/api/users`;
        const msg = {
            username,
            email,
            password
        }
        
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(msg),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
    };

    onSignup = () => {
        const res = this.signupPost().then(res => {
            if (res) {
                // this is my stoping point for right now
                console.log(res);
                this.props.next(res.username);
            }
        });
    };

    render() {
        const { classes } = this.props;
        
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
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        onChange={this.handleChange('password')}
                    />
                    <TextField
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
