import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'patternfly-react';

import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import { appBuilderVersion } from 'helpers/versions';

export const MODAL_ID = 'AboutInfoModal';

const AboutInfoModal = () => {
  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id="app.about" />
    </Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={MODAL_ID}
      modalTitle={modalTitle}
      modalFooter={<React.Fragment />}
    >
      <div>
        <h2 className="AboutPage__title">
          <FormattedMessage id="info.about" />
        </h2>
        <h3>
          <FormattedMessage id="info.about.entandoPlatform" />
        </h3>
        <p className="AboutPage__description">
          <FormattedMessage id="info.about.entando" />
        </p>
        <p className="AboutPage__description">
          <FormattedMessage id="info.about.docs" />
          <a href="https://dev.entando.org/" target="_blank" rel="noopener noreferrer"> dev.entando.org</a>
        </p>
        <p>
          <b><FormattedMessage id="info.about.version" values={{ version: appBuilderVersion }} /></b>
        </p>
      </div>
    </GenericModalContainer>
  );
};

export default AboutInfoModal;
