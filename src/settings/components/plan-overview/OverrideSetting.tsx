import FormControlLabel from '@material-ui/core/FormControlLabel';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import React from 'react';
import { OverrideMode } from '../../../app/model';
import translate from '../../i18n/Translation';
import FormTextField from '../FormTextField';

const styles: StyleRulesCallback = (theme) => ({
    planOverride: {
        marginBottom: theme.spacing.unit * 2,
    },
});

type PlanOverrideProps = {
    mode: OverrideMode,
    enabled: boolean;
    targetTemperature: number,

    text: string,
    setOverride: (mode: OverrideMode, target: number) => void,
} & WithStyles<typeof styles>;

const OverrideSetting: React.StatelessComponent<PlanOverrideProps> = (props) => {
    return (
        <React.Fragment>
            <div className={props.classes.planOverride}>
                <FormControlLabel
                    style={{ marginLeft: 0 }}
                    control={
                        <Switch
                            checked={props.enabled}
                            onChange={(e, checked) => {
                                props.setOverride(props.mode,
                                    checked ? (props.targetTemperature == 0 ? 16 : props.targetTemperature) : 0);
                            }} />
                    }
                    label={props.text}
                    labelPlacement="end"
                />

                <FormTextField
                    label={translate('plan.target.label')}
                    placeholder={translate('plan.target.placeholder')}
                    type="number"
                    disabled={!props.enabled}

                    value={props.targetTemperature}
                    onChange={(evt) => {
                        props.setOverride(props.mode, parseFloat(evt.target.value));
                    }}
                />
            </div>
        </React.Fragment>
    );
};

export default withStyles(styles)(OverrideSetting);
