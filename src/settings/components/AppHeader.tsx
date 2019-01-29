import AppBar from '@material-ui/core/AppBar';
import { withStyles, WithStyles, StyleRulesCallback } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { ReactChild } from 'react';

const styles: StyleRulesCallback = (theme) => ({
    appBar: {
    },

    grow: {
        flexGrow: 1,
    },

    buttons: {
        display: 'flex' as 'flex',
    },
    
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
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
    children: NamedSlots
};

const AppHeaderComponent: React.StatelessComponent<Props> = (props) => {
    const { classes } = props;
    const { button, title, actions, subBar } = props.children;

    return (
        <React.Fragment>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    {button}

                    <Typography variant="h6" color="inherit" noWrap>
                        {title}
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
        </React.Fragment>
    );
}

export default withStyles(styles)(AppHeaderComponent);