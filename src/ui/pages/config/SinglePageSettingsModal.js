import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'patternfly-react';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import SinglePageSettingsFormContainer from 'ui/pages/config/SinglePageSettingsFormContainer';

export const MODAL_ID = 'SinglePageSettingsModal';

const SinglePageSettingsModal = ({ onCancel, onSave }) => {
  const modalTitle = (
    <Modal.Title><FormattedMessage id="singlePageSettings.title" /></Modal.Title>
  );

  const modalFooter = <Modal.Footer />;

  return (
    <GenericModalContainer modalId={MODAL_ID} modalTitle={modalTitle} modalFooter={modalFooter} modalClassName="SinglePageSettingsModal">
      <SinglePageSettingsFormContainer onReset={onCancel} onSubmit={onSave} />
    </GenericModalContainer>
  );
};

SinglePageSettingsModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default SinglePageSettingsModal;
