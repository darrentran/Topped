import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { compose } from "recompose";
import { Button, Container, Grid, TextField } from '@material-ui/core';
import { SignUpLink } from "../../Pages/Register";
// import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from "../../Firebase/Database";
import * as ROUTES from "../../constants/routes";
import './login-form-styles.css'

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
}

interface ILoginComponentProps {
    firebase: any;
    history: any;
}

const INITIAL_STATE = {
    email: "",
    password: "",
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
        const { email, password } = this.state;

        const isInvalid = password === "" || email === "";

        return (
            <Container className="login-form-container">
                <form onSubmit={this.onSubmit}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid className="login-form-inputs">
                            <TextField
                                required
                                id="Email"
                                label="Email Address"
                                value={email}
                                onChange={(event: any) => { this.setState({ email: event.target.value }) }}
                                variant="outlined"
                                fullWidth
                                autoFocus
                                margin="normal"
                                color="secondary"
                            />
                        </Grid>
                        <Grid className="login-form-inputs">
                            <TextField
                                required
                                id="password"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(event: any) => { this.setState({ password: event.target.value }) }}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                color="secondary"
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        className="login-button"
                        container
                        direction="row"
                    >
                        <Button disabled={isInvalid} variant="outlined" type="submit" >
                            Sign In
                        </Button>
                    </Grid>
                </form>
            </Container>
        );
    }
}

const SignInLink = () => (
    <p>
        {`Already have an account? `}
        <Link to={ROUTES.LOGIN}>Login</Link>
    </p>
);


// TODO: Put proper types when I figure out what it is supposed to be 
const SignInForm = compose<any, any>(
    withRouter,
    withFirebase
)(SignInFormBase);

export default SignInPage;

export { SignInForm, SignInLink };
