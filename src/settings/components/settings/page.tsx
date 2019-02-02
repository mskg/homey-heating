import { Button, IconButton } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import CancelIcon from '@material-ui/icons/Cancel';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Settings } from '../../../app/model';
import { useSettings } from '../../api/hooks';
import { settingsAPI } from '../../api/settings';
import translate from "../../i18n/Translation";
import AppHeader from "../AppHeader";
import defautStyles from "../DefaultStyles";
import FormTextField from '../FormTextField';
import AppMenu from '../Menu';
import SubHeader from '../SubHeader';

const styles: StyleRulesCallback = (theme) => ({
    ...defautStyles(theme, theme.spacing.unit * 6), ...{
    }
});

type Params = {
    id: string;
};

type SettingsName = keyof typeof Settings;
type Props = WithStyles<typeof styles> & RouteComponentProps<Params>;

const SettingsPage: React.StatelessComponent<Props> = (props) => {
    const { classes } = props;
    const [openMenu, setOpenMenu] = React.useState<boolean>(false);
    const { settings, setSettings, loadSettings } = useSettings();

    const [isDirty, setDirty] = React.useState<boolean>(false);

    function getFieldValue(name: SettingsName, def: any = null) {
        const val = settings[name];
        return val == null ? def : val;
    }

    const updateField = (name: SettingsName) => event => {
        var val = event.target.value || event.target.checked;

        setSettings(old => {
            return { ...old, [name]: val }
        });
        setDirty(true);
    };

    const save = () => {
        settingsAPI.updateSettings(settings).then(p => {
            setDirty(false);
        })
    };

    return (
        <React.Fragment>
            <AppHeader>
                {{
                    title: translate("settings.title"),
                    button: (
                        <IconButton className={classes.menuButton} color="inherit" onClick={async () => {
                            if (isDirty) {
                                await loadSettings();
                                setDirty(false);
                            }
                            else {
                                setOpenMenu(true);
                            }
                        }}>
                            {isDirty && <CancelIcon />}
                            {!isDirty && <MenuIcon />}
                        </IconButton>
                    ),
                    actions: (
                        <React.Fragment>
                            {isDirty &&
                                <Button color="inherit" onClick={save}>
                                    save
                                </Button>
                            }
                        </React.Fragment>
                    ),
                    subBar: (
                        <AppMenu open={openMenu} onClose={() => { setOpenMenu(false); }} />
                    )
                }}
            </AppHeader>

            <Paper square className={classes.paper}>
                <SubHeader text={translate("settings.category_log")} />
                <FormControlLabel
                    control={
                        <Switch
                            checked={getFieldValue('LogEnabled') == true}
                            onChange={updateField('LogEnabled')} />
                    }
                    label={translate("settings.enabled.label")}
                    labelPlacement="start"
                />
                        
                <FormTextField
                    label={translate("settings.category.label")}
                    placeholder={translate("settings.category.placeholder")}

                    value={getFieldValue('LogCategory', '')}
                    onChange={updateField('LogCategory')}
                />

                <SubHeader text={translate("settings.backup.section")} />
                 <FormTextField
                    label={translate("settings.backup.label")}
                    placeholder={translate("settings.backup.placeholder")}

                    multiline
                    rowsMax="3"

                    value={getFieldValue('Plans', '')}
                    onChange={updateField('Plans')}
                />
            </Paper>
        </React.Fragment>
    );
}

export default withRouter(withStyles(styles)(SettingsPage));