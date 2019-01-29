import React from 'react';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import defautStyles from "./DefaultStyles";

const styles: StyleRulesCallback = (theme) => ({
    ...defautStyles(theme, theme.spacing.unit * 8), ...{
    }
});

const FormTextField = ({ classes, ...otherProps }: WithStyles<typeof styles> & TextFieldProps) => {
    return (
        <div className={classes.inputContainer}>
            <TextField
                fullWidth
                margin="normal"
                className={classes.input}

                {...otherProps}
            />
        </div>)
};

export default withStyles(styles)(FormTextField);