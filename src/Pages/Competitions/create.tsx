import React, { Component } from "react";
import 'date-fns';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../Firebase/Database";
import { compose } from "recompose";
import Competition from "../../models/competition";
import { Grid, Box, Container, FormControl } from "@material-ui/core";
import './create_form_styles.css'


interface ISubmissionFormState {
    compName: string;
    compDesc: string;
    compDate: Date;
    compStartTime: Date,
    compEndTime: Date,
    compProblems: number;
    compFee: number;
}

const SubmissionPage = () => (
    <div>
        <h1>Submit a new Competition</h1>
        <SubmissionForm />
    </div>
);

const INITIAL_STATE = {
    compName: "",
    compDesc: "",
    compDate: new Date(),
    compStartTime: new Date(),
    compEndTime: new Date(),
    compProblems: 0,
    compFee: 0
};

class SubmissionFormBase extends Component<any, ISubmissionFormState> {

    constructor(props: any) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }


    onSubmit = (event: any) => {
        event.preventDefault();
        const { compName, compDate, compDesc, compStartTime, compEndTime, compProblems, compFee } = this.state;
        //Do checks here and submit to firebase.\
        this.props.firebase
            .doInsertCompetition(new Competition("id", compName, compDesc, compDate, compStartTime, compEndTime, compFee, compProblems, ""));

    };

    onChange = (event: { target: { id: any; value: any; } }) => {
        const newState = { [event.target.id]: event.target.value } as Pick<ISubmissionFormState, keyof ISubmissionFormState>;;
        this.setState(newState);
    };

    render() {
        const { compName, compDesc, compDate, compStartTime, compEndTime, compProblems, compFee } = this.state;
        const isInvalid = compName === "" || compDesc === "" || compDate.toString() === "" || compStartTime.toString() === "" || compEndTime.toString() === "" || compProblems === 0;

        return (
            <Container className="create-form-container">
                <form onSubmit={this.onSubmit}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid className="create-form-inputs" >
                            <TextField
                                required
                                id="compName"
                                label="Competition Name"
                                value={compName}
                                onChange={this.onChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid className="create-form-inputs" >
                            <TextField
                                required
                                id="compDesc"
                                label="Description"
                                multiline
                                rows="4"
                                value={compDesc}
                                onChange={this.onChange}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid className="create-form-inputs" container direction="row" justify="flex-start" >
                                <KeyboardDatePicker
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    value={compDate}
                                    onChange={(date: any) => { this.setState({ compDate: date }) }}
                                    id="compStart"
                                    label="Start Date"
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid className="create-form-inputs" container direction="row" justify="flex-start" >
                                <Grid className="create-form-time-picker" item>
                                    <KeyboardTimePicker
                                        margin="normal"
                                        id="time-picker"
                                        label="Start Time"
                                        value={compStartTime}
                                        onChange={(time: any) => { this.setState({ compStartTime: time }) }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                        autoOk
                                    />
                                </Grid>
                                <Grid className="create-form-time-picker" item>
                                    <KeyboardTimePicker
                                        className="create-form-time-picker"
                                        margin="normal"
                                        id="time-picker"
                                        label="End Time"
                                        value={compEndTime}
                                        onChange={(time: any) => { this.setState({ compEndTime: time }) }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                        autoOk
                                    />
                                </Grid>
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                required
                                id="compProblems"
                                label="# Problems"
                                value={compProblems}
                                onChange={this.onChange}
                                variant="outlined"
                                type="number"
                                fullWidth
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                required
                                id="compFee"
                                label="Admission Fee"
                                value={compFee}
                                onChange={this.onChange}
                                variant="outlined"
                                type="number"
                                fullWidth
                            />
                        </FormControl>
                        <Grid className="create-submit-button" container direction="row" >
                            <Button
                                variant="outlined"
                                id="compSubmit"
                                type="submit"
                                disabled={isInvalid}
                                onClick={this.onSubmit}>
                                Submit
                        </Button>
                        </Grid>
                    </Grid>
                </form >
            </Container >

        );
    }
}

const SubmissionForm = compose(
    withRouter,
    withFirebase
)(SubmissionFormBase);

export default SubmissionPage;


export { SubmissionForm };