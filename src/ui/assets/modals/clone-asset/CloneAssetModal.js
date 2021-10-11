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

export const CLONE_ASSET_MODAL_ID = 'CloneAssetModal';

const CloneAssetModal = ({ onConfirmClone, info }) => {
  const { id, name } = info;
  const title = 'cms.label.duplicate';
  const confirmTitle = 'cms.assets.form.duplicateConfirm';
  const buttons = [
    <Button
      bsStyle="success"
      id="PublishContentModal__button-publish"
      onClick={() => onConfirmClone({ id, name })}
    >
      <FormattedMessage id={title} />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id={title} />
    </Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={CLONE_ASSET_MODAL_ID}
      buttons={buttons}
      modalTitle={modalTitle}
      className="DeleteContentModal"
    >
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="DeleteContentModal__icon" />
        <EmptyStateTitle>
          <FormattedMessage id={title} />
        </EmptyStateTitle>
        <EmptyStateInfo className="DeleteContentModal__info">
          <FormattedMessage
            id={confirmTitle}
            values={{ name }}
          />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

CloneAssetModal.propTypes = {
  onConfirmClone: PropTypes.func.isRequired,
  info: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

CloneAssetModal.defaultProps = {
  info: {
    asset: {},
  },
};

export default CloneAssetModal;
