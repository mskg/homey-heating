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

    otherButton: {

    },

    firstButton: {
        marginLeft: -12,
        // marginRight: 20,
    },
});

type Props = {
    open: boolean;
    onClose: () => void;
} & WithStyles<typeof styles> & RouteComponentProps;

const AppMenuBase: React.FunctionComponent<Props> = (props) => {
    const {classes} = props;

    const elements = [
        {
            to: "/",
            text: translate("menu.plans"),
        },
        {
            to: "/temperatures",
            text: translate("menu.schedule"),
        },
        {
            to: "/settings",
            text: translate("menu.settings"),
        },
    ]

    return (
        <Drawer open={props.open} onClose={props.onClose}>
            <Typography className={classes.text} variant="h5" gutterBottom>
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
    icon: React.ReactElement<any>,
    first?: boolean,
} & WithStyles<typeof styles> & IconButtonProps;

const MenuButtonBase: React.FunctionComponent<MenuButtonProps> = (props) => {
    const { classes, first, icon, ...otherProps } = props;

    return (
        <IconButton className={first ? classes.firstButton : classes.otherButton} color="inherit" {...otherProps}>
            {icon}
        </IconButton>    
    );
}

export const AppMenuButton: React.FunctionComponent = (props) => {
    const [openMenu, setOpenMenu] = React.useState<boolean>(false);

    return (
        <React.Fragment>
            <AppMenu open={openMenu} onClose={() => { setOpenMenu(false); }} />
            <MenuButton first onClick={() => { setOpenMenu(true); }} icon={<MenuIcon />} />
        </React.Fragment>
    );
}

const AppMenu = withRouter(withStyles(styles)(AppMenuBase));
export const MenuButton = withStyles(styles)(MenuButtonBase);

export default AppMenu;