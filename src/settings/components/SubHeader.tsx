import { StyleRulesCallback, withStyles, WithStyles } from "@material-ui/core/styles";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import React from "react";

const styles: StyleRulesCallback = (theme) => ({
    headline: {
        marginTop: theme.spacing.unit * 4,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
});

type SubHeaderProps = {
    text: string | undefined,
} & WithStyles<typeof styles> & TypographyProps;

const SubHeader: React.FunctionComponent<SubHeaderProps> = (props) => {
    const { classes, text, ...otherProps } = props;

    return (
        <Typography className={classes.headline} variant="h5" color="textSecondary" gutterBottom={true} {...otherProps}>
            {text}
        </Typography>
    );
};

export default withStyles(styles)(SubHeader);
