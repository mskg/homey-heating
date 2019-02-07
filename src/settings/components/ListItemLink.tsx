import { ListItem } from '@material-ui/core';
import { ListItemProps } from '@material-ui/core/ListItem';
import { LocationDescriptor } from 'history';
import React from 'react';
import { Link } from 'react-router-dom';

type Props =  {
    // ListItemProps and LinkProps both define an 'innerRef' property which are incompatible. 

    to: LocationDescriptor
    replace?: boolean
} & ListItemProps;

function createLink({innerRef, ...props}: Props) {
    // Remove `innerRef` from properties as the interface is incompatible.

    return <Link {...props} />
}

const ListItemLink: React.FunctionComponent<Props> = (props) => {
    return (
        <ListItem {...props} component={createLink}>
            {props.children}
        </ListItem>
    );
}

export default ListItemLink;