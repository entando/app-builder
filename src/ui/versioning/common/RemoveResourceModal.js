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

export const REMOVE_RESOURCE_MODAL_ID = 'RemoveResourceModal';

const RemoveResourceModal = ({ onConfirmRemove, info, resourceType }) => {
  const buttons = [
    <Button
      bsStyle="danger"
      id="RemoveResourceModal__button-delete"
      onClick={() => onConfirmRemove(info)}
    >
      <FormattedMessage id="cms.label.remove" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id={`cms.versioning.modal.${resourceType}RemoveCaption`} />
    </Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={REMOVE_RESOURCE_MODAL_ID}
      buttons={buttons}
      modalTitle={modalTitle}
      className="ResourceModal"
    >
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="ResourceModal__icon" />
        <EmptyStateTitle>
          <FormattedMessage id="cms.label.remove" />
          &nbsp;{info.name}
        </EmptyStateTitle>
        <EmptyStateInfo className="ResourceModal__info">
          <FormattedMessage
            id={`cms.versioning.modal.${resourceType}RemovePrompt`}
            values={{ name: info.name }}
          />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

RemoveResourceModal.propTypes = {
  onConfirmRemove: PropTypes.func.isRequired,
  resourceType: PropTypes.string.isRequired,
  info: PropTypes.shape({
    name: PropTypes.string,
  }),
};

RemoveResourceModal.defaultProps = {
  info: {
    name: '',
  },
};

export default RemoveResourceModal;
