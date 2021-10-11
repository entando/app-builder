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

export const RECOVER_RESOURCE_MODAL_ID = 'RecoverResourceModal';

const RecoverResourceModal = ({ onConfirmRecover, info, resourceType }) => {
  const buttons = [
    <Button
      bsStyle="primary"
      id="ResourceModal__button-recover"
      onClick={() => onConfirmRecover(info)}
    >
      <FormattedMessage id="cms.label.recover" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id={`cms.versioning.modal.${resourceType}RecoverCaption`} />
    </Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={RECOVER_RESOURCE_MODAL_ID}
      buttons={buttons}
      modalTitle={modalTitle}
      className="ResourceModal"
    >
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="ResourceModal__icon" />
        <EmptyStateTitle className="ResourceModal__title">
          <FormattedMessage id="cms.label.recover" />
          &nbsp;{info.name}
        </EmptyStateTitle>
        <EmptyStateInfo className="ResourceModal__info">
          <FormattedMessage
            id={`cms.versioning.modal.${resourceType}RecoverPrompt`}
            values={{ name: info.name }}
          />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

RecoverResourceModal.propTypes = {
  onConfirmRecover: PropTypes.func.isRequired,
  resourceType: PropTypes.string.isRequired,
  info: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

RecoverResourceModal.defaultProps = {
  info: {
    id: '',
    name: '',
  },
};

export default RecoverResourceModal;
