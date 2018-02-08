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

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    onLogin = () => {
        const { username, password } = this.state;
    
        console.log(username, password);

        this.props.next();
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
            <div className={classes.root}>
                <form className={classes.formContainer} noValidate autoComplete="off">
                    <TextField
                        id="username"
                        label="Username/Email"
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
