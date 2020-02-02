import React, { Component } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

// import { compose } from "recompose";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../../Firebase/Session";
import { FirebaseContext } from "../../Firebase/Database";

import './index.css'

interface ISideDrawerState {
    opened: boolean;
    openNested: boolean;
}

class SideDrawer extends Component<any, ISideDrawerState> {

    constructor(props: any) {
        super(props)
        this.state = {
            opened: false,
            openNested: false,
        }
    }

    handleClick = () => {
        this.setState((state) => {
            return { openNested: !state.openNested };
        });
    };


    toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        this.setState(() => {
            return { opened: open };
        });
    };


    sideList = () => (
        <div
            className="list"
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
                    <ListItemText onClick={this.toggleDrawer(false)} primary="PROFILE" />
                </ListItem>
                <ListItem button onClick={this.handleClick}>
                    <ListItemText primary="COMPETITIONS" />
                    {this.state.openNested ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse style={{ paddingLeft: '24px' }} in={this.state.openNested} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button >
                            {/* <Link to={ROUTES.LANDING}>
                                <ListItemText onClick={toggleDrawer(side, false)} primary="ALL ACTIVE" />
                            </Link> */}
                        </ListItem>
                        <ListItem button >
                            <ListItemText onClick={this.toggleDrawer(false)} primary="YOUR COMPETITIONS" />
                        </ListItem>
                        <ListItem button >
                            <ListItemText onClick={this.toggleDrawer(false)} primary="PREVIOUS" />
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem button>
                    <ListItemText onClick={this.toggleDrawer(false)} primary="LEADERBOARDS" />
                </ListItem>
            </List>
            <AuthUserContext.Consumer >
                {authUser =>
                    authUser ?
                        <ListItem button onClick={this.toggleDrawer(false)}>
                            <Link to={ROUTES.LANDING}>
                                <FirebaseContext.Consumer>
                                    {firebase => (
                                        <Button onClick={() => { firebase!.doSignOut() }}>
                                            Sign Out
                                    </Button>
                                    )}
                                </FirebaseContext.Consumer>
                            </Link>
                        </ListItem>
                        :
                        <ListItem button onClick={this.toggleDrawer(false)}>
                            <Link to={ROUTES.LOGIN}>
                                <Button >Sign In</Button>
                            </Link>
                        </ListItem>
                }

            </AuthUserContext.Consumer>

        </div>
    );

    render() {
        return (
            <div>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.toggleDrawer(true)} >
                    <MenuIcon />
                </IconButton>

                <SwipeableDrawer
                    open={this.state.opened}
                    onClose={this.toggleDrawer(false)}
                    onOpen={this.toggleDrawer(true)}
                >
                    {this.sideList()}
                </SwipeableDrawer>

            </div >
        )
    }
}

// const SideDrawer = compose(
//     withRouter,
//     withFirebase,
//     withAuthentication
// )(TempSideDrawer);

export default SideDrawer;


// TODO: Move text to bottom and take outside of button
// <AuthUserContext.Consumer >
//     {authUser =>
//         authUser ?
//             <ListItem button onClick={toggleDrawer(side, false)}>
//                 <Link to={ROUTES.LANDING}>
//                     <FirebaseContext.Consumer>
//                         {firebase => (
//                             <Button onClick={firebase.doSignOut()}>
//                                 Sign Out
//                             </Button>
//                         )}
//                     </FirebaseContext.Consumer>
//                 </Link>
//             </ListItem>
//             :
//             <ListItem button onClick={toggleDrawer(side, false)}>
//                 <Link to={ROUTES.LOGIN}>
//                     <Button >Sign In</Button>
//                 </Link>
//             </ListItem>
//     }

// </AuthUserContext.Consumer>