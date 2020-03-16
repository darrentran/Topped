import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../../Firebase/Database";
import * as ROUTES from "../../constants/routes";
import { FormControl, Input, InputLabel, Button, Container, Grid } from '@material-ui/core';
import './register-form-styles.css'

const SignUpPage = () => (
    <div>
        <h1>Sign Up</h1>
        <SignUpForm />
    </div>
);

const INITIAL_STATE = {
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    error: false
};

interface IRegisterComponentState {
    username: string;
    email: string;
    passwordOne: string;
    passwordTwo: string;
    error: boolean;
}

interface IRegisterComponentProps {
    firebase: any;
    history: any;
}

class SignUpFormBase extends Component<IRegisterComponentProps, IRegisterComponentState> {
    constructor(props: IRegisterComponentProps) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event: any) => {
        const { email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then((authUser: any) => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.LANDING);
            })
            .catch((error: any) => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    render() {
        const { username, email, passwordOne, passwordTwo, error } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === "" ||
            email === "" ||
            username === "";


        return (
            <Container className="register-form-container">
                <form onSubmit={this.onSubmit}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input id="username" name="username" autoComplete="off" autoFocus value={username} onChange={(event: any) => { this.setState({ username: event.target.value }) }} />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email" autoComplete="off" value={email} onChange={(event: any) => { this.setState({ email: event.target.value }) }} />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="passwordOne">Password</InputLabel>
                        <Input name="passwordOne" type="password" id="passwordOne" autoComplete="off" value={passwordOne} onChange={(event: any) => { this.setState({ passwordOne: event.target.value }) }} />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="passwordTwo">Confirm Password</InputLabel>
                        <Input name="passwordTwo" type="password" id="passwordTwo" autoComplete="off" value={passwordTwo} onChange={(event: any) => { this.setState({ passwordTwo: event.target.value }) }} />
                    </FormControl>
                    <Grid
                        className="register-submit-button"
                        container
                        direction="row"
                    >
                        <Button disabled={isInvalid} variant="outlined" type="submit">
                            Sign Up
                        </Button>
                    </Grid>

                    {/* TODO: Put proper error message */}
                    {error && <p>Error Message</p>}
                </form>
            </Container>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account?
        <Link to={ROUTES.REGISTER}>Sign Up</Link>
    </p>
);

const SignUpForm = compose<any, any>(
    withRouter,
    withFirebase
)(SignUpFormBase);


export default SignUpPage;

export { SignUpFormBase, SignUpLink };
