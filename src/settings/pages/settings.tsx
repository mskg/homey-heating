import { Button } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import CancelIcon from '@material-ui/icons/Cancel';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Settings } from '../../app/services/settings-manager';
import { useSettings } from '../api/hooks';
import { settingsAPI } from '../api/settings';
import AppHeader from "../components/AppHeader";
import FormTextField from '../components/FormTextField';
import { AppMenuButton, MenuButton } from '../components/Menu';
import SubHeader from '../components/SubHeader';
import translate from "../i18n/Translation";
import Page from '../layouts/Page';
import { InjectedNotistackProps, withSnackbar } from 'notistack';
import BodyText from '../components/BodyText';

const styles: StyleRulesCallback = (theme) => ({  
});

type Params = {
    id: string;
};

type SettingsName = keyof typeof Settings;
type Props = WithStyles<typeof styles> & RouteComponentProps<Params> & InjectedNotistackProps;

const SettingsPage: React.FunctionComponent<Props> = (props) => {
    const { settings, setSettings, loadSettings } = useSettings();
    const [isDirty, setDirty] = React.useState<boolean>(false);

    function getFieldValue(name: SettingsName, def: any = null) {
        const val = settings[name];
        return val == null ? def : val;
    }

    const updateField = (name: SettingsName) => event => {
        var val = event.target.value || (event.target.checked != null ? event.target.checked : null);

        setSettings(old => {
            return { ...old, [name]: val }
        });
        setDirty(true);
    };

    const save = () => {
        settingsAPI.updateSettings(settings).then(p => {
            props.enqueueSnackbar(translate("settings.saved"));
            setDirty(false);
        })
    };

    return (
        <Page>
            {{
                header: (
                    <AppHeader>
                        {{
                            title: translate("settings.title"),
                            button: (
                                <React.Fragment>
                                    {!isDirty && <AppMenuButton />}
                                    {isDirty &&
                                        <MenuButton first onClick={async () => {
                                            await loadSettings();
                                            setDirty(false);
                                        }} icon={<CancelIcon />} />
                                    }
                                </React.Fragment>
                            ),
                            actions: (
                                <React.Fragment>
                                    {isDirty &&
                                        <Button color="inherit" onClick={save}>
                                            save
                                        </Button>
                                    }
                                </React.Fragment>
                            )
                        }}
                    </AppHeader>
                ),
                paddingTop: 50,
                body: (
                    <React.Fragment>
                        <SubHeader text={translate("settings.log.category")} />
                        <BodyText text={translate("settings.log.text")} />
                        
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

                        <SubHeader text={translate("settings.backup.title")} />
                        <BodyText text={translate("settings.backup.text")} />
                        <FormTextField
                            label={translate("settings.backup.label")}
                            placeholder={translate("settings.backup.placeholder")}

                            multiline
                            rowsMax="5"

                            value={getFieldValue('Plans', '')}
                            onChange={updateField('Plans')}
                        />
                    </React.Fragment>
                )
            }}
        </Page>
    );
}

export default withSnackbar(withRouter(withStyles(styles)(SettingsPage)));