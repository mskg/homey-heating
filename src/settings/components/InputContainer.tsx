import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import React from 'react';

const styles: StyleRulesCallback = (theme) => ({
    inputContainer: {
        width: "100%",
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 3,
    },
});

type Props = {
    children: React.ReactElement<any>
} & WithStyles<typeof styles>;

const InputContainer: React.StatelessComponent<Props> = (props) => {
    return (<div className={props.classes.inputContainer}>{props.children}</div>);
};

export default withStyles(styles)(InputContainer);