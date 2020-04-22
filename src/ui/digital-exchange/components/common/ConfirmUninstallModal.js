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

  const hasUsage = info.usageList.some(componentUsage => componentUsage.usage > 0);

  const usage = info.usageList.map(componentUsage => `${componentUsage.type} ${componentUsage.code}`).join(', ');

  const buttons = [
    <Button bsStyle="danger" id="ConfirmUninstallModal_button" onClick={onUninstall} disabled={hasUsage}>
      <FormattedMessage id="digitalExchange.components.uninstall" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title><FormattedMessage id="digitalExchange.components.uninstall" /></Modal.Title>
  );

  const modalContent = (
    !hasUsage
      ? <FormattedMessage id="digitalExchange.components.confirmUninstall" values={{ name: info.name }} />
      : <FormattedMessage id="digitalExchange.components.usage" values={{ usage }} />
  );

  return (
    <GenericModalContainer modalId={info.id} buttons={buttons} modalTitle={modalTitle}>
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" />
        <EmptyStateTitle>
          {!hasUsage
            ? <FormattedMessage id="digitalExchange.components.uninstall" />
            : <FormattedMessage id="digitalExchange.components.cannotUninstall" />
          }
        </EmptyStateTitle>
        <EmptyStateInfo>
          {modalContent}
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
    usageList: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default ConfirmUninstallModal;
