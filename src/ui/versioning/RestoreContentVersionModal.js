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

export const RESTORE_CONTENT_VERSION_MODAL_ID = 'RestoreContentVersionModal';

const RestoreContentVersionModal = ({ onConfirmRestore, info }) => {
  const buttons = [
    <Button
      bsStyle="warning"
      id="RestoreContentVersionModal__button-delete"
      onClick={() => onConfirmRestore(info)}
    >
      <FormattedMessage id="cms.label.restore" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id="cms.label.restoreVersion" />
    </Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={RESTORE_CONTENT_VERSION_MODAL_ID}
      buttons={buttons}
      modalTitle={modalTitle}
      className="RestoreContentVersionModal"
    >
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="RestoreContentVersionModal__icon" />
        <EmptyStateTitle>
          <FormattedMessage id="cms.label.restoreVersion" />
          &nbsp;{info.version}
        </EmptyStateTitle>
        <EmptyStateInfo className="RestoreContentVersionModal__info">
          <FormattedMessage id="cms.label.modal.confirmRestore" values={{ version: info.version }} />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

RestoreContentVersionModal.propTypes = {
  onConfirmRestore: PropTypes.func.isRequired,
  info: PropTypes.shape({
    description: PropTypes.string,
    version: PropTypes.string,
  }),
};

RestoreContentVersionModal.defaultProps = {
  info: {
    version: '',
    description: '',
  },
};

export default RestoreContentVersionModal;
