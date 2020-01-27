import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            minWidth: 600,
            color: '#fff',
            background: '#fff',
            borderRadius: 5,
            margin: theme.spacing(1),
        },
    }),
);

export default function SearchBar() {
    const classes = useStyles();

    return (
        <TextField
            className={classes.margin}
            id="input-with-icon-textfield"
            variant="outlined"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
}
