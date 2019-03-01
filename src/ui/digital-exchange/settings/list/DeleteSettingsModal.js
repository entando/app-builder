import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  Button, EmptyState, Modal,
  EmptyStateIcon, EmptyStateTitle, EmptyStateInfo,
} from 'patternfly-react';

export const MODAL_ID = 'DeleteSettingsModal';

const DeleteSettingsModal = ({
  onConfirmDelete, info,
}) => {
  const buttons = [
    <Button bsStyle="danger" id="DeleteSettingsModal__button-delete" onClick={() => (onConfirmDelete(info.id))}>
      <FormattedMessage id="app.delete" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title><FormattedMessage id="app.delete" /></Modal.Title>
  );

  return (
    <GenericModalContainer modalId={MODAL_ID} buttons={buttons} modalTitle={modalTitle} className="DeleteSettingsModal">
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="DeleteSettingsModal__icon" />
        <EmptyStateTitle>
          <FormattedMessage id="app.delete" />&nbsp;{info.type}
        </EmptyStateTitle>
        <EmptyStateInfo className="DeleteSettingsModal__info">
          <FormattedMessage id="modal.confirm.delete" values={{ code: info.name }} />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

DeleteSettingsModal.propTypes = {
  onConfirmDelete: PropTypes.func,
  info: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
  }),
};

DeleteSettingsModal.defaultProps = {
  onConfirmDelete: () => {},
  info: {
    id: '',
    type: '',
    name: '',
  },
};

export default DeleteSettingsModal;
