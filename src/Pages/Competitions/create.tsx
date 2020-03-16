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
import { Grid, Container, FormControl } from "@material-ui/core";
import './create_form_styles.css'


interface ISubmissionFormState {
    compName: string;
    compDesc: string;
    compDate: Date;
    compStartTime: Date,
    compEndTime: Date,
    compProblems: number;
    compFee: number;
    compProblemsErrorText: string;
    compFeeErrorText: string;
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
    compFee: 0,
    compProblemsErrorText: "",
    compFeeErrorText: "",
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

    onChangeNumberProblems = (event: { target: { id: any; value: any; } }) => {
        if (event.target.value < 0) {
            this.setState({ compProblemsErrorText: "Number of problems canot be negative" });
        } else {
            this.setState({ compProblems: event.target.value, compProblemsErrorText: "" });
        }
    };


    onChangeCompFee = (event: { target: { id: any; value: any; } }) => {
        if (event.target.value < 0) {
            this.setState({ compFeeErrorText: "Number of problems canot be negative" });
        } else {
            this.setState({ compFee: event.target.value, compFeeErrorText: "" });
        }
    };

    render() {
        const { compName, compDesc, compDate, compStartTime, compEndTime, compProblems, compFee } = this.state;
        const isInvalid = compName === "" || compDesc === "" || compDate.toString() === "" || compStartTime.toString() === "" || compEndTime.toString() === "" || compProblems === 0 || compProblems.toString() === "";

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
                                variant="outlined"
                                fullWidth
                                autoFocus
                                margin="normal"
                                color="secondary"
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
                                margin="normal"
                                color="secondary"
                            />
                        </Grid>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid className="create-form-inputs" container direction="row" justify="flex-start" >
                                <KeyboardDatePicker
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    color="secondary"
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
                                        color="secondary"
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
                                        color="secondary"
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
                                label="Number of Problems"
                                value={compProblems}
                                error={this.state.compProblemsErrorText.length === 0 ? false : true}
                                helperText={this.state.compProblemsErrorText}
                                onChange={this.onChangeNumberProblems}
                                variant="outlined"
                                InputProps={{ inputProps: { min: 0 } }}
                                type="number"
                                fullWidth
                                margin="normal"
                                color="secondary"
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <TextField
                                id="compFee"
                                label="Admission Fee ($)"
                                value={compFee}
                                error={this.state.compFeeErrorText.length === 0 ? false : true}
                                helperText={this.state.compFeeErrorText}
                                onChange={this.onChangeCompFee}
                                variant="outlined"
                                InputProps={{ inputProps: { min: 0 } }}
                                type="number"
                                fullWidth
                                margin="normal"
                                color="secondary"
                            />
                        </FormControl>
                        <Grid className="create-submit-button" container direction="row" >
                            <Button
                                variant="outlined"
                                id="compSubmit"
                                type="submit"
                                disabled={isInvalid}
                                onClick={this.onSubmit}
                                color="secondary">
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