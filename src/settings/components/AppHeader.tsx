import AppBar from '@material-ui/core/AppBar';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { Fragment, ReactChild } from 'react';

const styles: StyleRulesCallback = (theme) => ({
    appBar: {
    },

    grow: {
        flexGrow: 1,
    },

    buttons: {
        display: 'flex' as 'flex',
    },
    
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

type NamedSlots = {
    title?: string,
    button?: ReactChild,
    actions?: ReactChild,
    subBar?: ReactChild
};

type Props = WithStyles<typeof styles> & {
    title?: string,
    button?: React.ReactElement<any>,
    children?: NamedSlots,
};

const AppHeaderComponent: React.FunctionComponent<Props> = (props) => {
    const { classes } = props;
    const { button, title, actions, subBar } = props.children || {
        button: null,
        title: null,
        actions: null,
        subBar: null,
    };

    return (
        <Fragment>
            <AppBar position="absolute" color="primary" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    {props.button || button}

                    <Typography variant="h6" color="inherit" noWrap>
                        {props.title || title}
                    </Typography>

                     <div className={classes.grow} />
                    {actions != null && 
                        <div className={classes.buttons}>
                            {actions}
                        </div>
                    }
                </Toolbar>

                {subBar != null && subBar}
            </AppBar>
        </Fragment>
    );
}

export default withStyles(styles)(AppHeaderComponent);