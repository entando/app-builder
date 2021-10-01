import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import {
  EmptyState,
  Modal,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateInfo,
} from 'patternfly-react';

export const NoDefaultWarningModalId = 'NoDefaultWarningModal';

const NoDefaultWarningModal = ({ multipleMode }) => {
  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id="widget.warning.nodefaulttemplate.title" />
    </Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={NoDefaultWarningModalId}
      modalTitle={modalTitle}
      className="NoDefaultWarningModal"
    >
      <EmptyState>
        <EmptyStateIcon name="exclamation" type="fa" className="NoDefaultWarningModal__icon" />
        <EmptyStateTitle className="overflow-ellipsis">
          <FormattedMessage id="widget.warning.nodefaulttemplate.title" />
        </EmptyStateTitle>
        <EmptyStateInfo className="NoDefaultWarningModal__info">
          <FormattedMessage id={`widget.warning.nodefaulttemplate.${multipleMode ? 'multi' : ''}describe`} />
        </EmptyStateInfo>
      </EmptyState>
    </GenericModalContainer>
  );
};

NoDefaultWarningModal.propTypes = {
  multipleMode: PropTypes.bool,
};

NoDefaultWarningModal.defaultProps = {
  multipleMode: false,
};

export default NoDefaultWarningModal;
