import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import defautStyles from "./DefaultStyles";

const styles: StyleRulesCallback = (theme) => ({
    ...defautStyles(theme, theme.spacing.unit * 8), ...{
    }
});

type SubHeaderProps = {
    text: string,
} & WithStyles<typeof styles>;

const SubHeader: React.StatelessComponent<SubHeaderProps> = (props) => {
    return (<Typography className={props.classes.text} variant="subtitle1" gutterBottom>
        {props.text}
    </Typography>);
};

export default withStyles(styles)(SubHeader);