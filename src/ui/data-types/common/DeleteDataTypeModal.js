import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  Button, EmptyState, Modal,
  EmptyStateIcon, EmptyStateTitle, EmptyStateInfo,
} from 'patternfly-react';

export const MODAL_ID = 'DeleteDataTypeModal';

const DeleteDataTypeModal = ({
  onConfirmDelete, info,
}) => {
  const buttons = [
    <Button bsStyle="danger" id="DeleteDataTypeModal__button-delete" onClick={() => (onConfirmDelete(info.code))}>
      <FormattedMessage id="app.delete" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title><FormattedMessage id="app.delete" /></Modal.Title>
  );

  return (
    <GenericModalContainer modalId={MODAL_ID} buttons={buttons} modalTitle={modalTitle} className="DeleteDataTypeModal">
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="DeleteDataTypeModal__icon" />
        <EmptyStateTitle>
          <FormattedMessage id="app.delete" />&nbsp;{info.type}
        </EmptyStateTitle>
        <EmptyStateInfo className="DeleteDataTypeModal__info">
          <FormattedMessage id="modal.confirm.delete" values={{ code: info.code }} />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

DeleteDataTypeModal.propTypes = {
  onConfirmDelete: PropTypes.func.isRequired,
  info: PropTypes.shape({
    code: PropTypes.string,
    type: PropTypes.string,
  }),
};

DeleteDataTypeModal.defaultProps = {
  info: {
    code: '',
    type: '',
  },
};

export default DeleteDataTypeModal;
