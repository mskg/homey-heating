import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import React from "react";
import InputContainer from "./InputContainer";

const FormTextField = ({ classes, ...otherProps }: TextFieldProps) => {
    return (
        <InputContainer>
            <TextField
                fullWidth={true}
                margin="normal"
                {...otherProps}
            />
        </InputContainer>);
};

export default FormTextField;
