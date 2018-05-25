import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  Button, EmptyState, Modal,
  EmptyStateIcon, EmptyStateTitle, EmptyStateInfo,
} from 'patternfly-react';

export const DELETE_FILE_MODAL_ID = 'DeleteFileModal';

const DeleteFileModal = ({
  onConfirmDelete, info,
}) => {
  const buttons = [
    <Button bsStyle="danger" id="DeleteFileModal__button-delete" onClick={() => (onConfirmDelete(info.file))}>
      <FormattedMessage id="app.delete" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title><FormattedMessage id="app.delete" /></Modal.Title>
  );

  const renderModalInfo = () => {
    let code = info.type;
    if (info.file) {
      code = info.file.path;
    }
    return <FormattedMessage id="modal.confirm.delete" values={{ code }} />;
  };

  return (
    <GenericModalContainer modalId={DELETE_FILE_MODAL_ID} buttons={buttons} modalTitle={modalTitle} className="DeleteFileModal">
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="DeleteFileModal__icon" />
        <EmptyStateTitle>
          <FormattedMessage id="app.delete" />&nbsp;{info.type}
        </EmptyStateTitle>
        <EmptyStateInfo className="DeleteFileModal__info">
          {renderModalInfo()}
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

DeleteFileModal.propTypes = {
  onConfirmDelete: PropTypes.func,
  info: PropTypes.shape({
    file: PropTypes.shape({
      path: PropTypes.string,
      protectedFolder: PropTypes.bool,
    }),
    type: PropTypes.string,
  }),
};

DeleteFileModal.defaultProps = {
  onConfirmDelete: () => {},
  info: {
    file: {
      path: '',
      protectedFolder: null,
    },
    type: '',
  },
};

export default DeleteFileModal;
