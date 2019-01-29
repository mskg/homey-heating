import Fab from '@material-ui/core/Fab';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';

const styles: StyleRulesCallback = (theme) => ({
    fabButton: {
        zIndex: 1,
        margin: '0 auto',

        position: 'absolute' as 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
});

type Props = WithStyles<typeof styles> & {
    onClick: () => void
};

const AddFabComponent: React.StatelessComponent<Props> = (props) => {
    const { classes } = props;

    return (
        <Fab color="secondary" aria-label="Add" className={classes.fabButton} onClick={() => props.onClick()}>
            <AddIcon />
        </Fab>
    );
}

export default withStyles(styles)(AddFabComponent);