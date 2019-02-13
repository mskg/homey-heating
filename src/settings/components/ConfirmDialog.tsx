import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useState } from "react";
import translate from "../i18n/Translation";
import Transition from "./Transition";

type ExternalProps = {
  title?: string;
  content: string;
};

type Props = {
  open: boolean;

  onOK: () => void;
  onCancel: () => void;
} & ExternalProps;

const ConfirmDialog: React.FunctionComponent<Props> = (props: Props) => {
  const { open, title, content, onOK, onCancel, ...others } = props;

  return (
    <Dialog open={open} onClose={() => { onCancel(); }} TransitionComponent={Transition}  {...others}>
      <DialogTitle>{title || translate("confirm.title")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content}
        </DialogContentText>

      </DialogContent>
      <DialogActions>
        <Button onClick={() => { onCancel(); }} color="primary">
          {translate("confirm.cancel")}
        </Button>

        <Button onClick={() => { onOK(); }} color="primary">
          {translate("confirm.ok")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const useConfirmDialog = (props: { onConfirm: () => void } & ExternalProps) => {
  const { onConfirm, ...others } = props;
  const [open, setIsOpen] = useState(false);

  const dialog = (
    <ConfirmDialog open={open} onCancel={() => { setIsOpen(false); }} onOK={onConfirm} {...others} />
  );

  return {
    dialog, isOpen: open, open: () => {
      setIsOpen(true);
    },
  };
};
