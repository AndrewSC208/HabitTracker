/*  NANME: snackbar - component
 *  SPEC: This is a global snackbar component for displaying message to the user. 
 *        It's attacked on the global level and can be triggered through the different action types
 */
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
/*** MODEL ***/
const initialState = {
    code: 0,
    text: '',
    lable: '',
    undoAction: null,
    open: false
}
/*** ACTION TYPES ***/
export const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION'
/*** ACTION CREATORS ***/
function createNotification(payload) {
    return {
        type: CREATE_NOTIFICATION,
        payload
    }
}
function deleteNotification(payload) {
    return {
        type: DELETE_NOTIFICATION,
        payload
    }
}
/*** REDUCER ***/
export const notification = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NOTIFICATION:
            return Object.assign({}, state, action.payload)

        case DELETE_NOTIFICATION:
            return Object.assign({}, state, action.payload)

        default:
            return state
    }
}
/*** STYLES ***/
const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    }
});
/*** COMPONENT ***/
class SnackBarView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleClick = () => {
        // this will be an dispatched action
        this.setState({ open: true });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        // this will be an dispatched action
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                // change this to point at redux state:
                open={this.state.open}
                autoHideDuration={6000}
                // change this to point to redux state:
                onClose={this.handleClose}
                SnackbarContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Note archived</span>}

                action={[
                    // change this to point to redux state:
                    <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>UNDO</Button>,
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        )
    }
}

const SnackBar = withStyles(styles)(SnackBarView);

export {
    SnackBar
}



