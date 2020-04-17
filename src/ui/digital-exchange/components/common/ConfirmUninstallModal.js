import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  Button, EmptyState, Modal,
  EmptyStateIcon, EmptyStateTitle, EmptyStateInfo,
} from 'patternfly-react';

const ConfirmUninstallModal = ({
  onConfirmUninstall, info,
}) => {
  const onUninstall = () => {
    onConfirmUninstall();
  };

  const buttons = [
    <Button bsStyle="danger" id="ConfirmUninstallModal_button" onClick={onUninstall}>
      <FormattedMessage id="digitalExchange.components.uninstall" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title><FormattedMessage id="digitalExchange.components.uninstall" /></Modal.Title>
  );

  return (
    <GenericModalContainer modalId={info.id} buttons={buttons} modalTitle={modalTitle}>
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" />
        <EmptyStateTitle>
          <FormattedMessage id="digitalExchange.components.uninstall" />
        </EmptyStateTitle>
        <EmptyStateInfo>
          <FormattedMessage id="digitalExchange.components.confirmUninstall" values={{ name: info.name }} />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

ConfirmUninstallModal.propTypes = {
  onConfirmUninstall: PropTypes.func.isRequired,
  info: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
  }).isRequired,
};

export default ConfirmUninstallModal;
