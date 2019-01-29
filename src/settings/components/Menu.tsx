import { Divider, List, ListItemText, StyleRulesCallback, Typography, WithStyles, withStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import translate from "../i18n/Translation";
import defautStyles from "./DefaultStyles";
import ListItemLink from './ListItemLink';

const styles: StyleRulesCallback = (theme) => ({
    ...defautStyles(theme), ...{
        text: {
            padding: theme.spacing.unit * 2
        },

        normal: {

        },

        selected: {
            color: theme.palette.primary.main
        }
    }
});

type Props = {
    open: boolean;
    onClose: () => void;
} & WithStyles<typeof styles> & RouteComponentProps;

const AppMenu: React.StatelessComponent<Props> = (props) => {
    const {classes} = props;

    const elements = [
        {
            to: "/plans",
            text: translate("menu.plans"),
        },
        {
            to: "/plans/schedule",
            text: translate("menu.schedule"),
        },
        {
            to: "/settings",
            text: translate("menu.settings"),
        },
        // {
        //     to: "/about",
        //     text: translate("menu.about"),
        // }
    ]

    return (
        <React.Fragment>
            <Drawer open={props.open} onClose={props.onClose}>
                <Typography className={classes.text} variant="subtitle1" gutterBottom>
                    {translate("menu.title")}
                </Typography>

                <Divider />
                <List>
                {
                    elements.map((e) => (
                        <ListItemLink key={e.to} to={e.to} disabled={props.match.url == e.to} button>
                            <ListItemText primary={e.text} 
                                classes={{primary: props.match.url != e.to ? classes.normal : classes.selected}} />
                        </ListItemLink>
                    ))
                }
                </List>
            </Drawer>
        </React.Fragment>
    );
};

export default withRouter(withStyles(styles)(AppMenu));