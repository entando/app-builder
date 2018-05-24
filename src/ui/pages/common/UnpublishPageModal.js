import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  Button, EmptyState, Modal,
  EmptyStateIcon, EmptyStateTitle, EmptyStateInfo,
} from 'patternfly-react';

export const MODAL_ID = 'UnpublishPageModal';

const UnpublishPageModal = ({ onConfirmUnpublish, info, page }) => {
  const onUnpublish = () => {
    onConfirmUnpublish(page);
  };

  const buttons = [
    <Button bsStyle="warning" id="UnpublishPageModal__button-publish" onClick={onUnpublish}>
      <FormattedMessage id="app.unpublish" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title><FormattedMessage id="app.unpublish" /></Modal.Title>
  );

  return (
    <GenericModalContainer modalId={MODAL_ID} buttons={buttons} modalTitle={modalTitle} className="UnpublishPageModal">
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="UnpublishPageModal__icon" />
        <EmptyStateTitle>
          <FormattedMessage id="app.unpublish" />&nbsp;{info.type}
        </EmptyStateTitle>
        <EmptyStateInfo className="UnpublishPageModal__info">
          <FormattedMessage id="modal.confirm.unpublish" values={{ code: info.code }} />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

UnpublishPageModal.propTypes = {
  onConfirmUnpublish: PropTypes.func,
  info: PropTypes.shape({
    code: PropTypes.string,
    type: PropTypes.string,
  }),
  page: PropTypes.shape({}),
};

UnpublishPageModal.defaultProps = {
  onConfirmUnpublish: () => {},
  info: {
    code: '',
    type: '',
  },
  page: {},
};

export default UnpublishPageModal;
