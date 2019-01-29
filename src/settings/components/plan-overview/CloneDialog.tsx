import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import translate from '../../i18n/Translation';
import Transition from "../Transition";

type Props = {
  open: boolean;
  name?: string;
  onConfirm: (name: string) => void;
  onCancel: () => void;
};

const CloneDialog: React.StatelessComponent<Props> = (props: Props) => {
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    setName('');
  }, [props.open]);

  return (
    <Dialog open={props.open} onClose={() => { props.onCancel() }} TransitionComponent={Transition}>/
      <DialogTitle>{translate("clone.title")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {translate("clone.text", { "name": props.name })}
        </DialogContentText>

        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          label={translate("clone.name.label")}
          placeholder={translate("clone.name.placeholder")}
          value={name}
          onChange={evt => { setName(evt.target.value); }}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { props.onCancel() }} color="primary">
          {translate("clone.cancel")}
        </Button>

        <Button onClick={() => { props.onConfirm(name) }} disabled={name == ''} color="primary">
          {translate("clone.ok")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CloneDialog;