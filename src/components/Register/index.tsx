import React, { Component } from 'react';
// import { Link, withRouter } from 'react-router-dom';
// import { compose } from 'recompose';
// import { withFirebase } from "../Firebase";
// import * as ROUTES from "../../constants/routes";

const SignUpPage = () => (
    <div>
        <h1>Sign Up</h1>
        {/* <SignUpForm /> */}
        <SignUpFormBase history={null} firebase={null} />
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: false,
};

interface ILoginComponentState {
    username: string;
    email: string;
    passwordOne: string;
    passwordTwo: string;
    error: boolean;
}

interface ILoginComponentProps {
    firebase: any;
    history: any;
}

class SignUpFormBase extends Component<ILoginComponentProps, ILoginComponentState> {
    constructor(props: ILoginComponentProps) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event: any) => {
        // const { email, passwordOne } = this.state;

        // this.props.firebase
        //     .doCreateUserWithEmailAndPassword(email, passwordOne)
        //     .then(authUser => {
        //         this.setState({ ...INITIAL_STATE });
        //         this.props.history.push(ROUTES.HOME);
        //     })
        //     .catch((error: any) => {
        //         this.setState({ error });
        //     });

        event.preventDefault();
    };

    render() {
        const { username, email, passwordOne, passwordTwo, error } = this.state;

        const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="username"
                    value={username}
                    onChange={(event: any) => {
                        this.setState({ username: event.target.value });
                    }}
                    type="text"
                    placeholder="Full Name"
                />
                <input
                    name="email"
                    value={email}
                    onChange={(event: any) => {
                        this.setState({ email: event.target.value });
                    }}
                    type="text"
                    placeholder="Email"
                />
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={(event: any) => {
                        this.setState({ passwordOne: event.target.value });
                    }}
                    type="text"
                    placeholder="Password"
                />
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={(event: any) => {
                        this.setState({ passwordTwo: event.target.value });
                    }}
                    type="text"
                    placeholder="Confirm Password"
                />

                <button disabled={isInvalid} type="submit">
                    Sign Up
                </button>

                {error && <p>{error}</p>}
            </form>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account?
        {/* <Link to={ROUTES.SIGN_UP}>Sign Up</Link> */}
    </p>
);

// const SignUpForm = compose(
//     withRouter,
//     withFirebase
// )(SignUpFormBase);

export default SignUpPage;

export { SignUpFormBase, SignUpLink };
