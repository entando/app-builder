import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  Button, EmptyState, Modal,
  EmptyStateIcon, EmptyStateTitle, EmptyStateInfo,
} from 'patternfly-react';
import { componentType } from 'models/component-repository/components';

const ConfirmDowngradeModal = ({ onConfirm, component, selectedVersion }) => {
  const buttons = [
    <Button
      bsStyle="primary"
      id="ConfirmDowngradeModal_button"
      onClick={() => onConfirm(component, selectedVersion)}
    >
      <FormattedMessage id="componentRepository.components.downgrade" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title><FormattedMessage id="componentRepository.components.downgrade" /></Modal.Title>
  );


  return (
    <GenericModalContainer modalId={`downgrade-${component.code}`} buttons={buttons} modalTitle={modalTitle}>
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" />
        <EmptyStateTitle>
          <FormattedMessage id="componentRepository.components.downgrade" />
        </EmptyStateTitle>
        <EmptyStateInfo>
          <FormattedMessage id="componentRepository.components.downgradeMessage" />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

ConfirmDowngradeModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  component: componentType.isRequired,
  selectedVersion: PropTypes.string.isRequired,
};

export default ConfirmDowngradeModal;
