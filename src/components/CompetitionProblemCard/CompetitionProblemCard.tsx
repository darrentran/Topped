import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import './CompetitionProblemCard.css';
// const COLORS = '../constants/Colors';


interface ICompetitionProblemCardProps {
    problem_number: number;
    attempts_made: number;
    completed: boolean;
}

interface ICompetitionProblemCardState {
    edit: boolean;
    attempts_made: number;
    completed: boolean;
}

export default class CompetitionProblemCard extends Component<ICompetitionProblemCardProps, ICompetitionProblemCardState> {
    constructor(props: ICompetitionProblemCardProps) {
        super(props)
        this.state = {
            edit: false,
            attempts_made: props.attempts_made,
            completed: props.completed
        };
    }


    toggleEdit = () => {
        this.setState((state) => {
            return { edit: !state.edit };
        });
    }

    incrementAttempts = () => {
        this.setState((state) => {
            return { attempts_made: state.attempts_made + 1 };
        });
    }

    decrementAttempts = () => {
        this.setState((state) => {
            return { attempts_made: state.attempts_made > 0 ? state.attempts_made - 1 : 0 };
        });
    }

    render() {
        return (
            <Card className="card">
                <Grid container spacing={2}
                    direction="row"
                    alignItems="center"
                    justify="center">

                    <Grid item xs={2}>
                        <Typography>{this.props.problem_number}</Typography>
                    </Grid>
                    <Grid item xs={7} style={{ textAlign: "left" }}>
                        {!this.state.edit
                            ?
                            <Typography>Attempts made: <Box component="span" fontWeight="fontWeightBold">{this.state.attempts_made}</Box></Typography>
                            :
                            <div>
                                <IconButton onClick={this.decrementAttempts}> <RemoveIcon /> </IconButton>
                                {this.state.attempts_made}
                                <IconButton onClick={this.incrementAttempts}> <AddIcon /> </IconButton>
                            </div>
                        }
                    </Grid>
                    <Grid item xs={1} >
                        {this.state.completed ? < DoneIcon /> : <CloseIcon />}
                    </Grid>
                    <Grid item xs={2}>
                        {!this.state.edit
                            ?
                            <IconButton onClick={this.toggleEdit}> <EditIcon /> </IconButton>
                            :
                            <IconButton onClick={this.toggleEdit}> <PlayArrowIcon /> </IconButton>
                        }
                    </Grid>
                </Grid>
            </Card>
        )
    }
}

