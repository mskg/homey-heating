import { Button } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { StyleRulesCallback, withStyles, WithStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import CancelIcon from "@material-ui/icons/Cancel";
import { InjectedNotistackProps, withSnackbar } from "notistack";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Settings } from "../../app/services/settings-manager/types";
import { useSettings } from "../api/hooks";
import { settingsAPI, SettingsHashMap } from "../api/settings";
import AppHeader from "../components/AppHeader";
import BodyText from "../components/BodyText";
import FormTextField from "../components/FormTextField";
import InputContainer from "../components/InputContainer";
import { AppMenuButton, MenuButton } from "../components/Menu";
import SubHeader from "../components/SubHeader";
import translate from "../i18n/Translation";
import Page from "../layouts/Page";

const styles: StyleRulesCallback = (theme) => ({
});

type Params = {
    id: string;
};

type SettingsName = keyof typeof Settings;
type Props = WithStyles<typeof styles> & RouteComponentProps<Params> & InjectedNotistackProps;

const SettingsPage: React.FunctionComponent<Props> = (props) => {
    const { settings, setSettings, loadSettings } = useSettings(true);
    const [isDirty, setDirty] = React.useState<boolean>(false);

    function getFieldValue(name: SettingsName, def: any = null) {
        const val = settings[name];
        return val == null ? def : val;
    }

    const updateField = (name: SettingsName, field: "value" | "checked" = "value") => (event) => {
        const val = event.target[field];

        setSettings((old) => {
            return { ...old, [name]: val } as SettingsHashMap;
        });
        setDirty(true);
    };

    const save = () => {
        settingsAPI.updateSettings(settings).then((p) => {
            props.enqueueSnackbar(translate("settings.saved"));
            setDirty(false);
        });
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
                                        <MenuButton
                                            first={true}
                                            onClick={async () => {
                                                await loadSettings();
                                                setDirty(false);
                                            }}
                                            icon={<CancelIcon />}
                                        />
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
                            ),
                        }}
                    </AppHeader>
                ),
                paddingTop: 50,
                paddingBottom: 50,
                body: (
                    <React.Fragment>
                        <SubHeader text={translate("settings.notifications.category")} />
                        <BodyText text={translate("settings.notifications.text")} />
                        <InputContainer>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={getFieldValue("NotifyModeChange", true) === true}
                                        onChange={updateField("NotifyModeChange", "checked")}
                                    />
                                }
                                label={translate("settings.notifications.NotifyModeChange")}
                                labelPlacement="end"
                            />
                        </InputContainer>
                        <InputContainer>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={getFieldValue("NotifySetError", true) === true}
                                        onChange={updateField("NotifySetError", "checked")}
                                    />
                                }
                                label={translate("settings.notifications.NotifySetError")}
                                labelPlacement="end"
                            />
                        </InputContainer>
                        <InputContainer>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={getFieldValue("NotifySetSuccess", true) === true}
                                        onChange={updateField("NotifySetSuccess", "checked")}
                                    />
                                }
                                label={translate("settings.notifications.NotifySetSuccess")}
                                labelPlacement="end"
                            />
                        </InputContainer>

                        <SubHeader text={translate("settings.log.category")} />
                        <BodyText text={translate("settings.log.text")} />

                        <InputContainer>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={getFieldValue("LogEnabled") === true}
                                        onChange={updateField("LogEnabled", "checked")}
                                    />
                                }
                                label={translate("settings.enabled.label")}
                                labelPlacement="end"
                            />
                        </InputContainer>

                        <FormTextField
                            label={translate("settings.category.label")}
                            placeholder={translate("settings.category.placeholder")}

                            required={getFieldValue("LogEnabled") === true}
                            value={getFieldValue("LogCategory", "")}
                            onChange={updateField("LogCategory")}
                        />

                        <SubHeader text={translate("settings.backup.title")} />
                        <BodyText text={translate("settings.backup.text")} />
                        <FormTextField
                            label={translate("settings.backup.label")}
                            placeholder={translate("settings.backup.placeholder")}

                            multiline={true}
                            rowsMax="10"

                            value={getFieldValue("Plans", "")}
                            onChange={updateField("Plans")}
                        />
                    </React.Fragment>
                ),
            }}
        </Page>
    );
};

export default withSnackbar(withRouter(withStyles(styles)(SettingsPage)));
