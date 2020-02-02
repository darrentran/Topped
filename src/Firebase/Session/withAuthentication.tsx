import React from "react";

import AuthUserContext from "./context";
import { withFirebase } from "../Database";
import Firebase from '../Database/firebase';


type IWithAuthenticationProps = {
    firebase: Firebase;
}

type IWithAuthenticationState = {
    authUser: any;
}

const withAuthentication = (Component: any) => {

    class withAuthentication extends React.Component<IWithAuthenticationProps, IWithAuthenticationState> {
        constructor(props: IWithAuthenticationProps) {
            super(props);

            this.state = {
                authUser: null
            };
        }

        componentDidMount() {
            this.props.firebase.auth.onAuthStateChanged(
                (authUser: any) => {
                    authUser
                        ? this.setState({ authUser })
                        : this.setState({ authUser: null });
                }
            );
        }

        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    {console.log(this.state.authUser)}
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            );
        }
    }
    return withFirebase(withAuthentication);
};

export default withAuthentication;
