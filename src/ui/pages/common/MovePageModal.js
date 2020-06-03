import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  Button, EmptyState, Modal,
  EmptyStateIcon, EmptyStateTitle, EmptyStateInfo,
} from 'patternfly-react';

export const MODAL_ID = 'MovePageModal';

const MovePageModal = ({
  onConfirmMove, info,
}) => {
  const {
    type, sourcePageCode, targetPageCode, action,
  } = info;
  const handleMove = () => {
    onConfirmMove(sourcePageCode, targetPageCode, action);
  };

  const buttons = [
    <Button bsStyle="danger" id="MovePageModal__button-confirm" onClick={handleMove}>
      <FormattedMessage id="app.move" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title><FormattedMessage id="app.move" /></Modal.Title>
  );

  return (
    <GenericModalContainer modalId={MODAL_ID} buttons={buttons} modalTitle={modalTitle} className="MovePageModal">
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="MovePageModal__icon" />
        <EmptyStateTitle>
          <FormattedMessage id="app.move" />&nbsp;{type}
        </EmptyStateTitle>
        <EmptyStateInfo className="MovePageModal__info">
          <FormattedMessage id="modal.confirm.movePage" values={{ code: sourcePageCode }} />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

MovePageModal.propTypes = {
  onConfirmMove: PropTypes.func,
  info: PropTypes.shape({
    type: PropTypes.string,
    sourcePageCode: PropTypes.string,
    targetPageCode: PropTypes.string,
    action: PropTypes.string,
  }),
};

MovePageModal.defaultProps = {
  onConfirmMove: null,
  info: {
    type: '',
    sourcePageCode: '',
    targetPageCode: '',
    action: '',
  },
};

export default MovePageModal;
