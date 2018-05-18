import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  Button, EmptyState, Modal,
  EmptyStateIcon, EmptyStateTitle, EmptyStateInfo,
} from 'patternfly-react';

export const MODAL_ID = 'DeleteLabelAndLanguagesModal';

const DeleteLabelAndLanguagesModal = ({ onConfirmDelete, info }) => {
  const buttons = [
    <Button bsStyle="danger" id="DeleteLabelAndLanguagesModal__button-delete" onClick={() => { onConfirmDelete(info); }}>
      <FormattedMessage id="app.delete" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title><FormattedMessage id="app.delete" /></Modal.Title>
  );

  return (
    <GenericModalContainer modalId={MODAL_ID} buttons={buttons} modalTitle={modalTitle} className="DeleteLabelAndLanguagesModal">
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="DeleteLabelAndLanguagesModal__icon" />
        <EmptyStateTitle>
          <FormattedMessage id="app.delete" />&nbsp;{info.type}
        </EmptyStateTitle>
        <EmptyStateInfo className="DeleteLabelAndLanguagesModal__info">
          <FormattedMessage id="modal.confirm.delete" values={{ code: info.code }} />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

DeleteLabelAndLanguagesModal.propTypes = {
  onConfirmDelete: PropTypes.func,
  info: PropTypes.shape({
    code: PropTypes.string,
    type: PropTypes.string,
  }),
};

DeleteLabelAndLanguagesModal.defaultProps = {
  onConfirmDelete: null,
  info: {
    code: '',
    type: '',
  },
};

export default DeleteLabelAndLanguagesModal;
