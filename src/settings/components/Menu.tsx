import { Divider, IconButton, List, ListItemText, StyleRulesCallback, Typography, WithStyles, withStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import { IconButtonProps } from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import translate from "../i18n/Translation";
import ListItemLink from "./ListItemLink";

const styles: StyleRulesCallback = (theme) => ({
    text: {
        padding: theme.spacing.unit * 2,
        paddingBottom: 0,
    },

    version: {
        padding: theme.spacing.unit * 2,
        paddingTop: 0,
    },

    normal: {
    },

    selected: {
        color: theme.palette.primary.main,
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
            type: "entry",
            to: "/",
            text: translate("menu.plans"),
        },
        {
            to: "/temperatures",
            text: translate("menu.temperatures"),
        },
        {
            to: "/schedules",
            text: translate("menu.schedules"),
        },
        {
            to: "/settings",
            text: translate("menu.settings"),
        },
        // {
        //     type: "Divider"
        // },
        {
            to: "https://homey-heating.mskg.app",
            text: translate("menu.help"),
        },
    ];

    return (
        <Drawer open={props.open} onClose={props.onClose}>
            <Typography className={classes.text} variant="h5" gutterBottom={true}>
                {translate("menu.title")}
            </Typography>
            <Typography className={classes.version} variant="body2" color="textSecondary" gutterBottom={true}>
                Version {__VERSION} ({__BUILD})
            </Typography>

            <Divider />
            <List>
            {
                elements.map((e) => (e.type === "Divider"
                    ? <Divider />
                    : <ListItemLink key={e.to} to={e.to} disabled={props.match.url === e.to} button={true}>
                        <ListItemText
                            primary={e.text}
                            classes={{primary: props.match.url !== e.to ? classes.normal : classes.selected}}
                        />
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
};

export const AppMenuButton: React.FunctionComponent = (_props) => {
    const [openMenu, setOpenMenu] = React.useState<boolean>(false);

    return (
        <React.Fragment>
            <AppMenu open={openMenu} onClose={() => { setOpenMenu(false); }} />
            <MenuButton first={true} onClick={() => { setOpenMenu(true); }} icon={<MenuIcon />} />
        </React.Fragment>
    );
};

const AppMenu = withRouter(withStyles(styles)(AppMenuBase));
export const MenuButton = withStyles(styles)(MenuButtonBase);

export default AppMenu;
