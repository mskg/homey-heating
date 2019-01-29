import { ListItem } from '@material-ui/core';
import { ListItemProps } from '@material-ui/core/ListItem';
import { LocationDescriptor } from 'history';
import * as React from 'react';
import { Link } from 'react-router-dom';

type Props =  {
    // ListItemProps and LinkProps both define an 'innerRef' property
    // which are incompatible. Therefore the props `to` and `replace` are
    // simply duplicated here.
    to: LocationDescriptor
    replace?: boolean
} & ListItemProps;

function createLink({innerRef, ...props}: Props) {
    // Remove `innerRef` from properties as the interface
    // is incompatible. The property `innerRef` should not be
    // needed as the `ListItem` component already provides that
    // feature with a different interface.
    return <Link {...props} />
}

const ListItemLink: React.StatelessComponent<Props> = (props) => {
    return (
        <ListItem {...props} component={createLink}>
            {props.children}
        </ListItem>
    );
}

export default ListItemLink;