import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import { Button, Modal } from 'patternfly-react';
import PageSettingsFormContainer from 'ui/pages/config/PageSettingsFormContainer';

export const MODAL_ID = 'PageSettingsModal';

const PageSettingsModal = ({ canSave, onSave }) => {
  const buttons = [
    <Button bsStyle="primary" id="PageSettingsModal__button-save" disabled={!canSave} onClick={onSave}>
      <FormattedMessage id="app.save" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title><FormattedMessage id="singlePageSettings.title" /></Modal.Title>
  );

  return (
    <GenericModalContainer modalId={MODAL_ID} buttons={buttons} modalTitle={modalTitle} modalClassName="PageSettingsModal">
      <PageSettingsFormContainer />
    </GenericModalContainer>
  );
};

PageSettingsModal.propTypes = {
  canSave: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default PageSettingsModal;
