import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  Button, EmptyState, Modal,
  EmptyStateIcon, EmptyStateTitle, EmptyStateInfo,
} from 'patternfly-react';

export const MODAL_ID = 'DeleteGroupModal';

const DeleteGroupModal = ({
  onConfirmDelete, info,
}) => {
  const buttons = (
    <Button bsStyle="danger" onClick={() => { onConfirmDelete(info.code); }}>
      <FormattedMessage id="app.delete" />
    </Button>
  );

  const modalTitle = (
    <Modal.Title><FormattedMessage id="app.delete" /></Modal.Title>
  );

  return (
    <GenericModalContainer modalId={MODAL_ID} buttons={buttons} modalTitle={modalTitle}>
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="DeleteGroupModal__icon" />
        <EmptyStateTitle>
          <FormattedMessage id="app.delete" />&nbsp;{info.type}
        </EmptyStateTitle>
        <EmptyStateInfo className="DeleteGroupModal__info">
          <FormattedMessage id="modal.confirm.delete" values={{ code: info.code }} />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

DeleteGroupModal.propTypes = {
  onConfirmDelete: PropTypes.func,
  info: PropTypes.shape({
    code: PropTypes.string,
    type: PropTypes.string,
  }),
};

DeleteGroupModal.defaultProps = {
  onConfirmDelete: null,
  info: {
    code: '',
    type: '',
  },
};

export default DeleteGroupModal;
