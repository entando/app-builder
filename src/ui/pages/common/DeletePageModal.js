import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  Button, EmptyState, Modal,
  EmptyStateIcon, EmptyStateTitle, EmptyStateInfo,
} from 'patternfly-react';

export const MODAL_ID = 'DeletePageModal';

const DeletePageModal = ({
  onConfirmDelete, info, page,
}) => {
  const onDelete = () => {
    onConfirmDelete(page, info.successRedirect);
  };

  const buttons = [
    <Button bsStyle="danger" id="DeletePageModal__button-delete" onClick={onDelete}>
      <FormattedMessage id="app.delete" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title><FormattedMessage id="app.delete" /></Modal.Title>
  );

  return (
    <GenericModalContainer modalId={MODAL_ID} buttons={buttons} modalTitle={modalTitle} className="DeletePageModal">
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="DeletePageModal__icon" />
        <EmptyStateTitle>
          <FormattedMessage id="app.delete" />&nbsp;{info.type}
        </EmptyStateTitle>
        <EmptyStateInfo className="DeletePageModal__info">
          <FormattedMessage id="modal.confirm.delete" values={{ code: info.code }} />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

DeletePageModal.propTypes = {
  onConfirmDelete: PropTypes.func,
  info: PropTypes.shape({
    code: PropTypes.string,
    type: PropTypes.string,
  }),
  page: PropTypes.shape({}),
};

DeletePageModal.defaultProps = {
  onConfirmDelete: null,
  info: {
    code: '',
    type: '',
  },
  page: {},
};

export default DeletePageModal;
