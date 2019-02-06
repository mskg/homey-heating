import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import React from 'react';

const styles: StyleRulesCallback = (theme) => ({
    text: {
        // marginTop: theme.spacing.unit * 4,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
});

type Props = {
    text: string,
} & WithStyles<typeof styles> & TypographyProps;

const BodyText: React.FunctionComponent<Props> = (props) => {
    const {classes,text, ...otherProps} = props;

    return (<Typography className={classes.text} color="textSecondary"  {...otherProps}>
        {text}
    </Typography>);
};

export default withStyles(styles)(BodyText);