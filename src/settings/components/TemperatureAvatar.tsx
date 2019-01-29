import Avatar from '@material-ui/core/Avatar';
import blue from '@material-ui/core/colors/lightBlue';
import deepOrange from '@material-ui/core/colors/deepOrange';
import green from '@material-ui/core/colors/green';
import React from 'react';

const getColor = (temp: number) => {
    if (temp <= 16) return blue;
    if (temp <= 20) return green;
    return deepOrange;
}

type Props = {
    value: number;
}

const TemperatureAvatar: React.StatelessComponent<Props> = (props) => {
    const { value } = props;

    return (
        <Avatar style={{ padding: "25px", background: getColor(value)[500], fontSize: "1em" }}>{value}</Avatar>
    );
}

export default TemperatureAvatar;
