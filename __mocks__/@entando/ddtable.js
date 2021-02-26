import React, { Fragment } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const DDTable = () => (<span />);
DDTable.Handle = () => (<span />);
DDTable.Tr = () => (<span />);
DDTable.DROP_MEDIUM = 'medium';
DDTable.DROP_HIGH = 'high';
DDTable.DROP_LOW = 'low';

export const DDProvider = ({ children }) => <Fragment>{children}</Fragment>;
export const DropTarget = () => () => ({
  default: () => <span />,
});

export const DragSource = () => () => ({
  default: () => <span />,
});

