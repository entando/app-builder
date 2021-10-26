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
} from 'patternfly-react';

export const ConfirmCancelModalID = 'ConfirmCancelModal';

const ConfirmCancelModal = ({
  modalTitleText, onSave, onDiscard, invalid, submitting, contentText, buttonsList, modalId,
}) => {
  const buttons = buttonsList || [
    <Button
      bsStyle="danger"
      id="ConfirmCancelModal__button-cancel"
      onClick={() => onDiscard()}
    >
      <FormattedMessage id="cms.label.dontSave" />
    </Button>,
    <Button
      type="button"
      bsStyle="primary"
      disabled={invalid || submitting}
      id="ConfirmCancelModal__button-save"
      onClick={() => onSave()}
    >
      <FormattedMessage id="cms.label.save" />
    </Button>,
  ];

  const modalTitle = modalTitleText && (
    <Modal.Title>
      {modalTitleText}
    </Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={modalId || ConfirmCancelModalID}
      buttons={buttons}
      modalTitle={modalTitle}
      className="ConfirmCancelModal"
    >
      <EmptyState className="ConfirmCancelModal__body">
        <EmptyStateIcon name="exclamation" type="fa" className="ConfirmCancelModal__icon" />
        <EmptyStateTitle className="ConfirmCancelModal__title">
          {contentText}
        </EmptyStateTitle>
      </EmptyState>
    </GenericModalContainer>
  );
};

ConfirmCancelModal.propTypes = {
  modalTitleText: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  contentText: PropTypes.string,
  buttonsList: PropTypes.arrayOf(PropTypes.element),
  modalId: PropTypes.string,
};

ConfirmCancelModal.defaultProps = {
  modalTitleText: '',
  invalid: false,
  submitting: false,
  contentText: '',
  buttonsList: undefined,
  modalId: undefined,
};

export default ConfirmCancelModal;
