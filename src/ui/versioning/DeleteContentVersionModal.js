import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  Button, EmptyState, Modal,
  EmptyStateIcon, EmptyStateTitle, EmptyStateInfo,
} from 'patternfly-react';

export const DELETE_CONTENT_VERSION_MODAL_ID = 'DeleteContentVersionModal';

const DeleteContentVersionModal = ({ onConfirmDelete, info }) => {
  const buttons = [
    <Button
      bsStyle="danger"
      id="DeleteContentVersionModal__button-delete"
      onClick={() => onConfirmDelete(info.contentId, info.versionId)}
    >
      <FormattedMessage id="cms.label.delete" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id="cms.label.deleteVersion" />
    </Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={DELETE_CONTENT_VERSION_MODAL_ID}
      buttons={buttons}
      modalTitle={modalTitle}
      className="DeleteContentVersionModal"
    >
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="DeleteContentVersionModal__icon" />
        <EmptyStateTitle>
          <FormattedMessage id="cms.label.deleteVersion" />
          &nbsp;{info.version}
        </EmptyStateTitle>
        <EmptyStateInfo className="DeleteContentVersionModall__info">
          <FormattedMessage id="cms.label.modal.confirmDeleteVersion" values={{ version: info.version }} />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

DeleteContentVersionModal.propTypes = {
  onConfirmDelete: PropTypes.func.isRequired,
  info: PropTypes.shape({
    contentId: PropTypes.string,
    description: PropTypes.string,
    version: PropTypes.string,
    versionId: PropTypes.number,
  }),
};

DeleteContentVersionModal.defaultProps = {
  info: {
    contentId: '',
    description: '',
    version: '',
    versionId: '',
  },
};

export default DeleteContentVersionModal;
