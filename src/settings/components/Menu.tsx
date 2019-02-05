import { Divider, List, ListItemText, StyleRulesCallback, Typography, WithStyles, withStyles, IconButton } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import translate from "../i18n/Translation";
import ListItemLink from './ListItemLink';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButtonProps } from '@material-ui/core/IconButton';

const styles: StyleRulesCallback = (theme) => ({
    text: {
        padding: theme.spacing.unit * 2
    },

    normal: {
    },

    selected: {
        color: theme.palette.primary.main
    },

    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

type Props = {
    open: boolean;
    onClose: () => void;
} & WithStyles<typeof styles> & RouteComponentProps;

const AppMenuBase: React.StatelessComponent<Props> = (props) => {
    const {classes} = props;

    const elements = [
        {
            to: "/",
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
    );
};


type MenuButtonProps = {
    icon: React.ReactElement<any>
} & WithStyles<typeof styles> & IconButtonProps;

export const MenuButtonBase: React.StatelessComponent<MenuButtonProps> = (props) => {
    const { classes, icon, ...otherProps } = props;

    return (
        <IconButton className={classes.menuButton} color="inherit" {...otherProps}>
            {icon}
        </IconButton>    
    );
}

export const AppMenuButton: React.StatelessComponent = (props) => {
    const [openMenu, setOpenMenu] = React.useState<boolean>(false);

    return (
        <React.Fragment>
            <AppMenu open={openMenu} onClose={() => { setOpenMenu(false); }} />
            <MenuButton onClick={() => { setOpenMenu(true); }} icon={<MenuIcon />} />
        </React.Fragment>
    );
}

const AppMenu = withRouter(withStyles(styles)(AppMenuBase));
export const MenuButton = withStyles(styles)(MenuButtonBase);

export default AppMenu;
