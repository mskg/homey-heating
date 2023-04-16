import { ListItem } from "@material-ui/core";
import { ListItemProps } from "@material-ui/core/ListItem";
import { LocationDescriptor } from "history";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
    // ListItemProps and LinkProps both define an 'innerRef' property which are incompatible.

    to: LocationDescriptor
    replace?: boolean,
} & ListItemProps;

const ListItemLink: React.FunctionComponent<Props> = (props) => {
    const url = props.to.toString();
    return (
        // @ts-ignore
        <ListItem {...props} component={url.match(/https/) ? "a" : Link} href={url}>
            {props.children}
        </ListItem>
    );
};

export default ListItemLink;
