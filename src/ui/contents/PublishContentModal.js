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

export const PUBLISH_CONTENT_MODAL_ID = 'PublishContentModal';

const PublishContentModal = ({ onConfirmPublish, info }) => {
  const { onLine: isPublish, contents = [] } = info;
  const title = `cms.contents.${isPublish ? 'publish' : 'unpublish'}`;
  const confirmTitle = `cms.label.modal.confirm${isPublish ? 'publish' : 'unpublish'}`;
  const urlParam = isPublish ? 'published' : 'draft';
  const buttons = [
    <Button
      bsStyle={isPublish ? 'success' : 'warning'}
      id="PublishContentModal__button-publish"
      onClick={() => {
        const contentIds = contents.map(content => content.id);
        onConfirmPublish(contentIds, urlParam);
      }}
    >
      <FormattedMessage id={title} />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id={title} />
    </Modal.Title>
  );

  const contentsCodes = contents.map(c => c.id).join();
  const renderDescriptions = contents.map(c => c.description).join('\n');
  return (
    <GenericModalContainer
      modalId={PUBLISH_CONTENT_MODAL_ID}
      buttons={buttons}
      modalTitle={modalTitle}
      className="DeleteContentModal"
    >
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="DeleteContentModal__icon" />
        <EmptyStateTitle>
          <FormattedMessage id={title} />
          <div className="overflow-ellipsis" title={renderDescriptions} style={{ whiteSpace: 'pre-line' }}>
            &nbsp;{renderDescriptions}
          </div>
        </EmptyStateTitle>
        <EmptyStateInfo className="DeleteContentModal__info">
          <FormattedMessage
            id={confirmTitle}
            values={{ code: contentsCodes }}
          />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

PublishContentModal.propTypes = {
  onConfirmPublish: PropTypes.func.isRequired,
  info: PropTypes.shape({
    onLine: PropTypes.bool,
    contents: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

PublishContentModal.defaultProps = {
  info: {
    contents: [],
    onLine: false,
  },
};

export default PublishContentModal;
