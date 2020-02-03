import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { ExpansionPanel, ExpansionPanelSummary, FormControlLabel, ExpansionPanelDetails } from '@material-ui/core';
import { COLORS } from '../../constants/colors';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        borderRadius: 5,
    },
    card_expanded: {
        maxWidth: 600,
        borderRadius: 5,
        background: COLORS.card_background,
    },
}));

interface ICompetitionCardProps {
    name: String;
    description: String;
    date: String;
    fee: number;
}

const CompetitionCard: React.FC<ICompetitionCardProps> = ({ name, description, date, fee }) => {
    const classes = useStyles();

    return (
        <ExpansionPanel className={classes.card}>
            <ExpansionPanelSummary
                aria-label="Expand"
                aria-controls="additional-actions1-content"
                id="additional-actions1-header"
            >
                <Grid container spacing={1} direction="row" alignItems="center" style={{ paddingRight: '3%' }}>
                    <Grid item sm={9} style={{ textAlign: 'left' }}>
                        <Typography noWrap variant="h6">
                            {name}
                        </Typography>
                    </Grid>

                    <Grid item sm={2}>
                        <FormControlLabel
                            aria-label="Bookmark"
                            onClick={event => event.stopPropagation()}
                            onFocus={event => event.stopPropagation()}
                            control={
                                <IconButton aria-label="add to favorites">
                                    <BookmarkIcon />
                                </IconButton>
                            }
                            label=""
                        />
                    </Grid>

                    <Grid item sm={1}>
                        <FormControlLabel
                            aria-label="Join"
                            onClick={event => event.stopPropagation()}
                            onFocus={event => event.stopPropagation()}
                            control={
                                <Button style={{ background: '#92cbc5', color: '#fff' }} variant="contained">
                                    JOIN
                                </Button>
                            }
                            label=""
                        />
                    </Grid>
                </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.card_expanded}>
                <Grid container spacing={0} direction="column" justify="center">
                    <Typography paragraph style={{ textAlign: 'left' }}>
                        {description}
                    </Typography>

                    <Divider />

                    <Grid container spacing={1} direction="column" style={{ paddingTop: '3%' }}>
                        <Grid item>
                            <Typography style={{ float: 'left', fontWeight: 'bold' }}>Date:</Typography>
                            <Typography style={{ float: 'right', fontWeight: 'bold' }}>{date}</Typography>
                        </Grid>

                        <Grid item>
                            <Typography style={{ float: 'left', fontWeight: 'bold' }}>Entrance Fee:</Typography>
                            <Typography style={{ float: 'right', fontWeight: 'bold' }}>${fee}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default CompetitionCard;
