import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import Icon from 'material-ui/Icon';
import HomeIcon from 'material-ui-icons/Home';
import CakeIcon from 'material-ui-icons/Cake';
import GroupIcon from 'material-ui-icons/Group';

const styles = {
    root: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
    },
};

class BottomNav extends Component {
    state = {
        value: 'recents',
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
                <BottomNavigationAction label="Home" value="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Feed" value="feed" icon={<CakeIcon />} />
                <BottomNavigationAction label="Groupes" value="groupes" icon={<GroupIcon />} />
            </BottomNavigation>
        );
    }
}

BottomNav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNav);