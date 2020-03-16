import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { FormControl, Input, InputLabel, Button, Container, Grid, TextField, Typography } from '@material-ui/core';
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
            <Container className="login-form-container">
                <form onSubmit={this.onSubmit}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email" autoComplete="off" autoFocus value={email} onChange={(event: any) => { this.setState({ email: event.target.value }) }} />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input name="password" type="password" id="password" autoComplete="off" value={password} onChange={(event: any) => { this.setState({ password: event.target.value }) }} />
                    </FormControl>
                    <Grid
                        className="login-button"
                        container
                        direction="row"
                    >
                        <Button disabled={isInvalid} variant="outlined" type="submit" >
                            Sign In
                        </Button>
                    </Grid>

                    {/* TODO: Put proper error message */}
                    {error && <p>Error Message</p>}
                </form>
            </Container>
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
