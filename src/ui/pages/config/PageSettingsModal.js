import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import { Modal } from 'patternfly-react';
import PageSettingsFormContainer from 'ui/pages/config/PageSettingsFormContainer';

export const MODAL_ID = 'PageSettingsModal';

const PageSettingsModal = ({ onCancel, onSave }) => {
  const modalTitle = (
    <Modal.Title><FormattedMessage id="singlePageSettings.title" /></Modal.Title>
  );

  const modalFooter = <Modal.Footer />;

  return (
    <GenericModalContainer modalId={MODAL_ID} modalTitle={modalTitle} modalFooter={modalFooter} modalClassName="PageSettingsModal">
      <PageSettingsFormContainer onReset={onCancel} onSubmit={onSave} />
    </GenericModalContainer>
  );
};

PageSettingsModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default PageSettingsModal;
