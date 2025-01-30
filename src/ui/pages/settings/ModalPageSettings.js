import React from 'react';
import { Modal } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import PageSettingsFormContainer from '../common/PageSettingsFormContainer';

const ModalPageSettings = props => (
  <Modal {...props} className="ModalPageSettings">
    <Modal.Header closeButton>
      <Modal.Title> <FormattedMessage id="pageSettings.title" /></Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <PageSettingsFormContainer />
    </Modal.Body>
  </Modal>
);

export default ModalPageSettings;
