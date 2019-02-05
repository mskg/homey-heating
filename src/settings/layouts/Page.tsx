import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import React, { ReactChild } from 'react';
import AppMenu from '../components/Menu';

const styles: StyleRulesCallback = (theme) => ({
    root: {
        webkitOverflowScrolling: "touch",
        display: "flex",
        flexFlow: "column",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#fff",
    },

    body: {
        flex : "1 0 100%",
        margin: 0,
        maxWidth: "100%",
        overflowY: "scroll",
    }
});

type NamedSlots = {
    header: ReactChild,
    body: ReactChild,
    paddingTop: number | string,
};

type Props = WithStyles<typeof styles> & {
    children: NamedSlots
};

const PageComponent: React.StatelessComponent<Props> = (props) => {
    const { classes } = props;
    const { header, body, paddingTop } = props.children;

    return (
        <React.Fragment>
            <div className={classes.root}>
                {header}
                <div className={classes.body} style={{paddingTop: paddingTop}}>
                    {body}
                </div>
            </div>
        </React.Fragment>
    );
}

export default withStyles(styles)(PageComponent);