import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Tabs,
  Tab,
  Icon,
} from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import GenericModal from 'ui/common/modal/GenericModal';
import LinkConfigUrlForm from 'ui/common/link-config/LinkConfigUrlForm';

const getLinkUrl = (type, value) => `#!${type};${value}!#`;

const ID = 'LinkConfigModal';

const LinkConfigModal = ({
  isVisible, onClose, onSave,
}) => {
  const handleSubmit = (values) => {
    const linkObj = { ...values.attributes };
    if (values.url) {
      linkObj.url = getLinkUrl('U', values.url);
    } else {
      return;
    }

    onSave(linkObj);
  };

  const renderedModalTitle = (
    <Modal.Title>
      <FormattedMessage id="linkconfig.title" />
    </Modal.Title>
  );

  const renderedUrlTabTitle = (
    <React.Fragment>
      <Icon name="globe" />&nbsp;<FormattedMessage id="linkconfig.linkToUrl" />
    </React.Fragment>
  );

  return (
    <GenericModal
      modalClassName="LinkConfigModal"
      visibleModal={isVisible ? ID : null}
      modalId={ID}
      modalTitle={renderedModalTitle}
      modalFooter={<React.Fragment />}
      onCloseModal={onClose}
    >
      <Tabs
        defaultActiveKey="url"
        id="LinkConfigModal-Tabs"
        animation={false}
        mountOnEnter
      >
        <Tab eventKey="url" title={renderedUrlTabTitle}>
          <LinkConfigUrlForm onSubmit={handleSubmit} onCancel={onClose} />
        </Tab>
      </Tabs>
    </GenericModal>
  );
};

LinkConfigModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default LinkConfigModal;
