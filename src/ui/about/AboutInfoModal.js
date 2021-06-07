import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  EmptyState,
  Modal,
  EmptyStateIcon,
  EmptyStateTitle,
} from 'patternfly-react';

import setVisibleModal from 'state/modal/actions';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import { appBuilderVersion } from 'helpers/versions';

export const MODAL_ID = 'AboutInfoModal';

const AboutInfoModal = () => {
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(setVisibleModal(''));
  }, [dispatch]);

  const modalTitle = (
    <Modal.Title>
      <FormattedMessage id="app.about" />
    </Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={MODAL_ID}
      modalTitle={modalTitle}
      modalFooter={null}
    >
      <EmptyState>
        <EmptyStateTitle>
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
        </EmptyStateTitle>
      </EmptyState>
    </GenericModalContainer>
  );
};

export default AboutInfoModal;
