import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  Button, EmptyState, Modal,
  EmptyStateIcon, EmptyStateTitle, EmptyStateInfo,
} from 'patternfly-react';
import { componentType } from 'models/component-repository/components';

const ConfirmDowngradeModal = ({
  onConfirm, component, selectedVersion, isConflictVersion, cleanUp,
}) => {
  const type = isConflictVersion ? 'conflict' : 'downgrade';
  const buttonText = isConflictVersion ? 'replace' : 'downgrade';

  const buttons = [
    <Button
      bsStyle="primary"
      id="ConfirmDowngradeModal_button"
      onClick={() => onConfirm(component, selectedVersion)}
    >
      <FormattedMessage id={`componentRepository.components.${buttonText}`} />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id={`componentRepository.components.${type}`} />
    </Modal.Title>
  );


  return (
    <GenericModalContainer
      modalId={`downgrade-${component.code}`}
      buttons={buttons}
      modalTitle={modalTitle}
      modalCloseCleanup={cleanUp}
    >
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" />
        <EmptyStateTitle>
          <FormattedMessage
            id={`componentRepository.components.${type}`}
          />
        </EmptyStateTitle>
        <EmptyStateInfo>
          <FormattedMessage
            id={`componentRepository.components.${type}Message`}
          />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

ConfirmDowngradeModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  cleanUp: PropTypes.func.isRequired,
  component: componentType.isRequired,
  selectedVersion: PropTypes.string.isRequired,
  isConflictVersion: PropTypes.bool.isRequired,
};

export default ConfirmDowngradeModal;
