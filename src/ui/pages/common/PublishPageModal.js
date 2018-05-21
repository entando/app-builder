import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  Button, EmptyState, Modal,
  EmptyStateIcon, EmptyStateTitle, EmptyStateInfo,
} from 'patternfly-react';

export const MODAL_ID = 'PublishPageModal';

const PublishPageModal = ({ onConfirmPublish, info, page }) => {
  const onPublish = () => {
    onConfirmPublish(page);
  };

  const buttons = [
    <Button bsStyle="success" id="PublishPageModal__button-publish" onClick={onPublish}>
      <FormattedMessage id="app.publish" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title><FormattedMessage id="app.publish" /></Modal.Title>
  );

  return (
    <GenericModalContainer modalId={MODAL_ID} buttons={buttons} modalTitle={modalTitle} className="PublishPageModal">
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="PublishPageModal__icon" />
        <EmptyStateTitle>
          <FormattedMessage id="app.publish" />&nbsp;{info.type}
        </EmptyStateTitle>
        <EmptyStateInfo className="PublishPageModal__info">
          <FormattedMessage id="modal.confirm.publish" values={{ code: info.code }} />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

PublishPageModal.propTypes = {
  onConfirmPublish: PropTypes.func,
  info: PropTypes.shape({
    code: PropTypes.string,
    type: PropTypes.string,
  }),
  page: PropTypes.shape({}),
};

PublishPageModal.defaultProps = {
  onConfirmPublish: () => {},
  info: {
    code: '',
    type: '',
  },
  page: {},
};

export default PublishPageModal;
