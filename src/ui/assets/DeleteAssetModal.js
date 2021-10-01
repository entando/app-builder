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

export const DELETE_ASSET_MODAL_ID = 'DeleteAssetModal';

const DeleteAssetModal = ({ onConfirmDelete, info }) => {
  const buttons = [
    <Button
      bsStyle="danger"
      id="DeleteContentModal__button-delete"
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
      modalId={DELETE_ASSET_MODAL_ID}
      buttons={buttons}
      modalTitle={modalTitle}
      className="DeleteContentModal"
    >
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="DeleteContentModal__icon" />
        <EmptyStateTitle className="DeleteContentModal__title">
          <FormattedMessage id="cms.label.delete" />
          &nbsp;{info.description}
        </EmptyStateTitle>
        <EmptyStateInfo className="DeleteContentModal__info">
          <FormattedMessage id="cms.label.modal.confirmdelete" values={{ code: info.description }} />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

DeleteAssetModal.propTypes = {
  onConfirmDelete: PropTypes.func.isRequired,
  info: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
  }),
};

DeleteAssetModal.defaultProps = {
  info: {
    id: '',
    description: '',
  },
};

export default DeleteAssetModal;
