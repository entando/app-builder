import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, EmptyState, Modal,
  EmptyStateIcon, EmptyStateTitle, EmptyStateInfo,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import GenericModalContainer from 'ui/common/modal/GenericModalContainer';

export const MODAL_ID = 'DeleteSenderModal';

const DeleteSenderModal = ({ info, onDeleteConfirm }) => {
  const buttons = [
    <Button id={`${MODAL_ID}-button`} bsStyle="danger" onClick={() => onDeleteConfirm(info.code)}>
      <FormattedMessage id="app.delete" />
    </Button>,
  ];

  const modalTitle = <Modal.Title><FormattedMessage id="app.delete" /></Modal.Title>;

  return (
    <GenericModalContainer modalId={MODAL_ID} buttons={buttons} modalTitle={modalTitle}>
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" />
        <EmptyStateTitle>
          <FormattedMessage id="app.delete" />&nbsp;{info.type}
        </EmptyStateTitle>
        <EmptyStateInfo>
          <FormattedMessage id="modal.confirm.delete" values={{ code: info.code }} />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

DeleteSenderModal.propTypes = {
  info: PropTypes.shape({
    code: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  onDeleteConfirm: PropTypes.func.isRequired,
};

export default DeleteSenderModal;
