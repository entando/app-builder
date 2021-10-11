import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  Button,
  EmptyState,
  Modal,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateInfo,
} from 'patternfly-react';

export const MODAL_ID = 'DeleteContentTypeModal';

const DeleteContentTypeModal = ({ onConfirmDelete, info }) => {
  const buttons = [
    <Button
      bsStyle="danger"
      id="DeleteContentTypeModal__button-delete"
      onClick={() => onConfirmDelete(info.code)}
    >
      <FormattedMessage id="cms.label.delete" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id="cms.label.delete" />
    </Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={MODAL_ID}
      buttons={buttons}
      modalTitle={modalTitle}
      className="DeleteContentTypeModal"
    >
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="DeleteContentTypeModal__icon" />
        <EmptyStateTitle>
          <FormattedMessage id="cms.label.delete" />
          &nbsp;{info.name}
        </EmptyStateTitle>
        <EmptyStateInfo className="DeleteContentTypeModal__info">
          <FormattedMessage id="cms.label.modal.confirmdelete" values={{ code: info.code }} />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

DeleteContentTypeModal.propTypes = {
  onConfirmDelete: PropTypes.func.isRequired,
  info: PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
  }),
};

DeleteContentTypeModal.defaultProps = {
  info: {
    code: '',
    name: '',
  },
};

export default DeleteContentTypeModal;
