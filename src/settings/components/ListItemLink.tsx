import { ListItem } from "@material-ui/core";
import { ListItemProps } from "@material-ui/core/ListItem";
import { LocationDescriptor } from "history";
import React from "react";
import { Link } from "react-router-dom";

type Props =  {
    // ListItemProps and LinkProps both define an 'innerRef' property which are incompatible.

    to: LocationDescriptor
    replace?: boolean,
} & ListItemProps;

function createLink({innerRef, ...props}: Props) {
    // Remove `innerRef` from properties as the interface is incompatible.

    if (props.to.toString().match(/https/)) {
        return <a onClick={() => Homey.openURL(props.to.toString())} {...props}>{props.children}</a>;
    }

    return <Link {...props} />;
}

const ListItemLink: React.FunctionComponent<Props> = (props) => {
    return (
        <ListItem {...props} component={createLink as unknown as "a"}>
            {props.children}
        </ListItem>
    );
};

export default ListItemLink;
