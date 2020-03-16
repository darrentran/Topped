import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../../Firebase/Database";
import * as ROUTES from "../../constants/routes";
import { SignInLink } from "../Login";
import { TextField, Button, Container, Grid } from '@material-ui/core';
import './register-form-styles.css'

const SignUpPage = () => (
    <div>
        <h1>Sign Up</h1>
        <SignUpForm />
        <SignInLink />
    </div>
);

const INITIAL_STATE = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
};

interface IRegisterComponentState {
    email: string;
    password: string;
    confirmPassword: string;
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
        const { email, password } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then((authUser: any) => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.LANDING);
            });

        event.preventDefault();
    };

    render() {
        const { email, password, confirmPassword } = this.state;

        const isInvalid =
            password !== confirmPassword ||
            password === "" ||
            email === "" ||
            this.state.password !== this.state.confirmPassword


        return (
            <Container className="register-form-container">
                <form onSubmit={this.onSubmit}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid className="register-form-inputs" >
                            <TextField
                                required
                                id="email address"
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
                        <Grid className="register-form-inputs" >
                            <TextField
                                required
                                id="password"
                                label="Password"
                                type="password"
                                error={this.state.password !== this.state.confirmPassword}
                                helperText={this.state.password !== this.state.confirmPassword ? "Passwords do not match" : ""}
                                value={password}
                                onChange={(event: any) => { this.setState({ password: event.target.value }) }}
                                variant="outlined"
                                fullWidth
                                autoFocus
                                margin="normal"
                                color="secondary"
                            />
                        </Grid>
                        <Grid className="register-form-inputs" >
                            <TextField
                                required
                                id="confirm password"
                                label="Confirm Password"
                                type="password"
                                error={this.state.password !== this.state.confirmPassword}
                                helperText={this.state.password !== this.state.confirmPassword ? "Passwords do not match" : ""}
                                value={confirmPassword}
                                onChange={(event: any) => { this.setState({ confirmPassword: event.target.value }) }}
                                variant="outlined"
                                fullWidth
                                autoFocus
                                margin="normal"
                                color="secondary"
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        className="register-submit-button"
                        container
                        direction="row"
                    >
                        <Button disabled={isInvalid} variant="outlined" type="submit">
                            Sign Up
                        </Button>
                    </Grid>
                </form>
            </Container>
        );
    }
}

const SignUpLink = () => (
    <p>

        {`Don't have an account? `}
        <Link to={ROUTES.REGISTER}>Sign Up</Link>
    </p>
);

const SignUpForm = compose<any, any>(
    withRouter,
    withFirebase
)(SignUpFormBase);


export default SignUpPage;

export { SignUpFormBase, SignUpLink };
