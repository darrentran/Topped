import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../../Firebase/Session";
import { FirebaseContext, withFirebase } from "../../Firebase/Database";
import { compose } from 'recompose';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

function TemporaryDrawer() {
    const classes = useStyles();

    const [openNested, setOpenNested] = React.useState(true);
    const [state, setState] = React.useState({ left: false });

    const handleClick = () => {
        setOpenNested(!openNested);
    };

    type DrawerSide = 'top' | 'left' | 'bottom' | 'right';
    const toggleDrawer = (side: DrawerSide, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = (side: DrawerSide) => (
        <div
            className={classes.list}
            role="presentation"
        >
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Topped
                    </ListSubheader>
                }
            >
                <ListItem button>
                    <ListItemText onClick={toggleDrawer(side, false)} primary="PROFILE" />
                </ListItem>
                <ListItem button onClick={handleClick}>
                    <ListItemText primary="COMPETITIONS" />
                    {openNested ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse style={{ paddingLeft: '24px' }} in={openNested} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button >
                            {/* <Link to={ROUTES.LANDING}>
                                <ListItemText onClick={toggleDrawer(side, false)} primary="ALL ACTIVE" />
                            </Link> */}
                        </ListItem>
                        <ListItem button >
                            <ListItemText onClick={toggleDrawer(side, false)} primary="YOUR COMPETITIONS" />
                        </ListItem>
                        <ListItem button >
                            <ListItemText onClick={toggleDrawer(side, false)} primary="PREVIOUS" />
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem button>
                    <ListItemText onClick={toggleDrawer(side, false)} primary="LEADERBOARDS" />
                </ListItem>
            </List>

            {/* TODO: Move text to bottom and take outside of button */}
            <AuthUserContext.Consumer >
                {authUser =>
                    authUser ?
                        <ListItem button onClick={toggleDrawer(side, false)}>
                            <Link to={ROUTES.LANDING}>
                                <FirebaseContext.Consumer>
                                    {firebase => (
                                        <Button onClick={() => { firebase.doSignOut() }}>
                                            Sign Out
                                        </Button>
                                    )}
                                </FirebaseContext.Consumer>
                            </Link>
                        </ListItem>
                        :
                        <ListItem button onClick={toggleDrawer(side, false)}>
                            <Link to={ROUTES.LOGIN}>
                                <Button >Sign In</Button>
                            </Link>
                        </ListItem>
                }

            </AuthUserContext.Consumer>
        </div>
    );

    return (
        <div>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)} >
                <MenuIcon />
            </IconButton>

            <SwipeableDrawer
                open={state.left}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {sideList('left')}
            </SwipeableDrawer>

        </div>
    );
}

const SideDrawer = compose(
    withRouter,
    withFirebase
)(TemporaryDrawer);

export default SideDrawer;