import { BusinessCenter, DirectionsWalk, FreeBreakfast, Home, Hotel, HotTub, People } from '@material-ui/icons';
import React from 'react';

type Props = {
    name: string
}

export default function ZoneIcon(props: Props) {
    switch (props.name) {
        case "home":
            return (<Home />);

        case "bed":
            return (<Hotel />);

        case "living":
            return (<People />);

        case "toilet":
        case "shower":
            return (<HotTub />);

        case "books":
        case "study":
            return (<BusinessCenter />);

        case "kitchen":
            return (<FreeBreakfast />);

        default:
            return (<DirectionsWalk />);
    }
}