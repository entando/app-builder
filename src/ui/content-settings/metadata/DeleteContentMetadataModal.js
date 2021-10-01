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

export const MODAL_ID = 'DeleteContentMetadataModal';

const DeleteContentMetadataModal = ({ onConfirmDelete, info }) => {
  const buttons = [
    <Button
      bsStyle="danger"
      id="DeleteContentMetadataModal__button-delete"
      onClick={() => onConfirmDelete(info)}
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
      className="DeleteContentMetadataModal"
    >
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="DeleteContentMetadataModal__icon" />
        <EmptyStateTitle>
          <FormattedMessage id="cms.label.delete" />
          &nbsp;{`"${info.key}"`}
        </EmptyStateTitle>
        <EmptyStateInfo className="DeleteContentMetadataModal__info">
          <FormattedMessage id="cms.label.modal.confirmdelete" values={{ code: `"${info.key}"` }} />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

DeleteContentMetadataModal.propTypes = {
  onConfirmDelete: PropTypes.func.isRequired,
  info: PropTypes.shape({
    id: PropTypes.number,
    descr: PropTypes.string,
    key: PropTypes.string,
  }),
};

DeleteContentMetadataModal.defaultProps = {
  info: {
    id: '',
    descr: '',
  },
};

export default DeleteContentMetadataModal;
