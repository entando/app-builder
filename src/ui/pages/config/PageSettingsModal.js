import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import { Button, Modal } from 'patternfly-react';

export const MODAL_ID = 'PageSettingsModal';

const PageSettingsModal = ({
  onSave,
}) => {
  const buttons = [
    <Button bsStyle="primary" id="PageSettingsModal__button-save" onClick={() => onSave()}>
      <FormattedMessage id="app.save" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title><FormattedMessage id="pageSettings.title" /></Modal.Title>
  );

  return (
    <GenericModalContainer modalId={MODAL_ID} buttons={buttons} modalTitle={modalTitle} modalClassName="PageSettingsModal" />
  );
};

PageSettingsModal.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default PageSettingsModal;
