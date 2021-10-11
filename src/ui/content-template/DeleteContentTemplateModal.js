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

export const MODAL_ID = 'DeleteContentTemplateModal';

const DeleteContentTemplateModal = ({ onConfirmDelete, info }) => {
  const buttons = [
    <Button
      bsStyle="danger"
      id="DeleteContentTemplateModal__button-delete"
      onClick={() => onConfirmDelete(info)}
    >
      <FormattedMessage id="cms.label.delete" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id="cms.label.delete" />
    </Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={MODAL_ID}
      buttons={buttons}
      modalTitle={modalTitle}
      className="DeleteContentTemplateModal"
    >
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="DeleteContentTemplateModal__icon" />
        <EmptyStateTitle className="overflow-ellipsis">
          <FormattedMessage id="cms.label.delete" />
          <span title={info.descr}>&nbsp;{info.descr}</span>
        </EmptyStateTitle>
        <EmptyStateInfo className="DeleteContentTemplateModal__info">
          <FormattedMessage id="cms.label.modal.confirmdelete" values={{ code: info.id }} />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

DeleteContentTemplateModal.propTypes = {
  onConfirmDelete: PropTypes.func.isRequired,
  info: PropTypes.shape({
    id: PropTypes.number,
    descr: PropTypes.string,
  }),
};

DeleteContentTemplateModal.defaultProps = {
  info: {
    id: '',
    descr: '',
  },
};

export default DeleteContentTemplateModal;
