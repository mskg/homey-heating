import FormControlLabel from '@material-ui/core/FormControlLabel';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import React from 'react';
import { OverrideMode } from '../../../app/model';
import translate from '../../i18n/Translation';
import FormTextField from '../FormTextField';
import {TARGET_TEMPERATURE_MIN, TARGET_TEMPERATURE_MAX} from '../../../app/services/homey-api/declarations';

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
                    disabled={!props.enabled}

                    type="number"                        
                    InputProps={{ inputProps: { min: TARGET_TEMPERATURE_MIN, max: TARGET_TEMPERATURE_MAX, step: 0.5 } }}

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
