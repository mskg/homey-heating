// import { StyleRulesCallback } from "@material-ui/core/styles";

export default ((theme, padding = 50) => ({
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },

    resetPadding: {
        paddingBottom: 50,
        paddingTop: padding,
        paddingLeft: 0,
        paddingRight: 0,
    },

    paper: {
        minHeight: "100%",
        paddingBottom: 50,
        paddingTop: padding,
        minWidth: "100%",
        maxWidth: "100%",
    },

    inputContainer: {
        width: "100%",
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 3,
    },

    divider: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 1,
    },

    input: {
        // marginLeft: theme.spacing.unit * 2,
        // marginRight: "-14px",
        
        // paddingRight: theme.spacing.unit * 4,
        // marginTop: theme.spacing.unit * 2,
        // marginTop: 0,
    },

    formControl: {
        // marginTop: theme.spacing.unit * 2,
        minWidth: "100%",
    },

    list: {
        marginTop: 0,
        marginBottom: theme.spacing.unit * 2,
    },

    headline: {
        marginTop: theme.spacing.unit * 4,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },

    text: {
        // marginTop: theme.spacing.unit * 4,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
}));