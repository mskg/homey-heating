import { Checkbox, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { find, map, remove } from "lodash";
import React from 'react';
import { Day } from '../../../app/model';
import translate from '../../i18n/Translation';
import Transition from "../Transition";

type Props = {
  open: boolean;

  onConfirm: (days: Day[]) => void;
  onCancel: () => void;
};

const CopyDayDialog: React.StatelessComponent<Props> = (props: Props) => {
  const [days, setDays] = React.useState<Day[]>([]);

  React.useEffect(() => {
    setDays(null);
  }, [props.open]);

  const toggleDay = (day) => setDays(oldDays => {
    if (oldDays == null) { oldDays = []; }

    const found = find(oldDays, d => d === day);
    remove(oldDays, d => d === day);

    if (found == null) {
      oldDays.push(day);
    }

    return oldDays;
  });

  return (
    <Dialog open={props.open} onClose={() => { props.onCancel() } } TransitionComponent={Transition}>
      <DialogTitle>{translate("copy.title")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
        {translate("copy.text")}
        </DialogContentText>

        <List dense={true}>
          {map([1, 2, 3, 4, 5, 6, 0], day => (
            <ListItem key={day} button onClick={() => toggleDay(day)}>
              <ListItemText primary={translate(`copy.${Day[day]}`)} />
              <ListItemSecondaryAction>
                <Checkbox checked={find(days, d => d == day) != null} onClick={() => toggleDay(day)} />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { props.onCancel() }} color="primary">
        {translate("copy.cancel")}
        </Button>

        <Button onClick={() => { props.onConfirm(days) }} color="primary">
        {translate("copy.ok")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CopyDayDialog;