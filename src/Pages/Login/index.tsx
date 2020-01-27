import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../../Pages/Register";
// import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from "../../Firebase/Database";
import * as ROUTES from "../../constants/routes";

const SignInPage = () => (
    <div>
        <h1>Sign In</h1>
        <SignInForm />
        {/* <PasswordForgetLink /> */}
        <SignUpLink />
    </div>
);

interface ILoginComponentState {
    email: string;
    password: string;
    error: boolean;
}

interface ILoginComponentProps {
    firebase: any;
    history: any;
}

const INITIAL_STATE = {
    email: "",
    password: "",
    error: false
};

class SignInFormBase extends Component<ILoginComponentProps, ILoginComponentState> {
    constructor(props: ILoginComponentProps) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event: any) => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.LANDING);
            });

        event.preventDefault();
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === "" || email === "";

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={(event: any) => { this.setState({ email: event.target.value }) }}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="password"
                    value={password}
                    onChange={(event: any) => { this.setState({ password: event.target.value }) }}
                    type="text"
                    placeholder="Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign In
                </button>

                {/* TODO: Put proper error message */}
                {error && <p>Error Message</p>}
            </form>
        );
    }
}


// TODO: Put proper types when I figure out what it is supposed to be 
const SignInForm = compose<any, any>(
    withRouter,
    withFirebase
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
