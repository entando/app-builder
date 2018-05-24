import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  Button, EmptyState, Modal,
  EmptyStateIcon, EmptyStateTitle, EmptyStateInfo,
} from 'patternfly-react';

export const MODAL_ID = 'DeleteFolderModal';

const DeleteFolderModal = ({
  onConfirmDelete, info,
}) => {
  const buttons = [
    <Button bsStyle="danger" id="DeleteFolderModal__button-delete" onClick={() => (onConfirmDelete(info.file))}>
      <FormattedMessage id="app.delete" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title><FormattedMessage id="app.delete" /></Modal.Title>
  );

  return (
    <GenericModalContainer modalId={MODAL_ID} buttons={buttons} modalTitle={modalTitle} className="DeleteFolderModal">
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="DeleteFolderModal__icon" />
        <EmptyStateTitle>
          <FormattedMessage id="app.delete" />&nbsp;{info.type}
        </EmptyStateTitle>
        <EmptyStateInfo className="DeleteFolderModal__info">
          <FormattedMessage id="modal.confirm.delete" values={{ code: info.type }} defaultValues={{ code: '' }} />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

DeleteFolderModal.propTypes = {
  onConfirmDelete: PropTypes.func,
  info: PropTypes.shape({
    file: PropTypes.shape({
      path: PropTypes.string,
      protectedFolder: PropTypes.bool,
    }),
    type: PropTypes.string,
  }),
};

DeleteFolderModal.defaultProps = {
  onConfirmDelete: null,
  info: {
    file: {
      path: '',
      protectedFolder: null,
    },
    type: '',
  },
};

export default DeleteFolderModal;
