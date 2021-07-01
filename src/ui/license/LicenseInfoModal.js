import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'patternfly-react';

import GenericModalContainer from 'ui/common/modal/GenericModalContainer';

export const MODAL_ID = 'LicenseInfoModal';

const LicenseInfoModal = () => {
  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id="app.license" />
    </Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={MODAL_ID}
      modalTitle={modalTitle}
      modalFooter={<React.Fragment />}
    >
      <div>
        <h2 className="LicensePage__title">
          <FormattedMessage id="info.license" />
        </h2>
        <section>
          <p className="LicensePage__description">
            <FormattedMessage id="info.license.description" />
          </p>
          <p>
            <a href="https://www.gnu.org/licenses/lgpl-3.0.en.html" target="_blank" rel="noopener noreferrer">
              <FormattedMessage id="info.license.type" />
            </a>
          </p>
        </section>
      </div>
    </GenericModalContainer>
  );
};

export default LicenseInfoModal;
