import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  Button, EmptyState, Modal,
  EmptyStateIcon, EmptyStateTitle, EmptyStateInfo,
} from 'patternfly-react';

export const MODAL_ID = 'DeleteAttributeModal';

const DeleteAttributeModal = ({
  onConfirmDelete, info,
}) => {
  const buttons = [
    <Button bsStyle="danger" id="DeleteAttributeModal__button-delete" onClick={() => (onConfirmDelete(info.code))}>
      <FormattedMessage id="app.delete" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title><FormattedMessage id="app.delete" /></Modal.Title>
  );

  return (
    <GenericModalContainer modalId={MODAL_ID} buttons={buttons} modalTitle={modalTitle} className="DeleteAttributeModal">
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="DeleteAttributeModal__icon" />
        <EmptyStateTitle>
          <FormattedMessage id="app.delete" />&nbsp;{info.type}
        </EmptyStateTitle>
        <EmptyStateInfo className="DeleteAttributeModal__info">
          <FormattedMessage id="modal.confirm.delete" values={{ code: info.code }} />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

DeleteAttributeModal.propTypes = {
  onConfirmDelete: PropTypes.func,
  info: PropTypes.shape({
    code: PropTypes.string,
    type: PropTypes.string,
  }),
};

DeleteAttributeModal.defaultProps = {
  onConfirmDelete: null,
  info: {
    code: '',
    type: '',
  },
};

export default DeleteAttributeModal;
