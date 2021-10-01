import React from 'react';
import Draggable from 'react-draggable';
import { ModalDialog } from 'react-bootstrap';

const DraggableDialog = props => (
  <Draggable handle=".modal-title">
    <ModalDialog {...props} />
  </Draggable>
);

export default DraggableDialog;
