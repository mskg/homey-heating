import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import InputContainer from './InputContainer';

const FormTextField = ({ classes, ...otherProps }: TextFieldProps) => {
    return (
        <InputContainer>
            <TextField
                fullWidth
                margin="normal"
                {...otherProps}
            />
        </InputContainer>)
};

export default FormTextField;