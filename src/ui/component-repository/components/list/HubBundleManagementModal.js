import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, Modal } from 'patternfly-react';

import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import BundlePreview from 'ui/component-repository/components/item/hub/BundlePreview';
import { getInfo } from 'state/modal/selectors';
import { setVisibleModal } from 'state/modal/actions';
import { sendDeployBundle } from 'state/component-repository/hub/actions';
import { getLoading } from 'state/loading/selectors';

export const HUB_BUNDLE_MANAGEMENT_MODAL_ID = 'HubBundleManagementModalId';

const HubBundleManagementModal = () => {
  const dispatch = useDispatch();
  const info = useSelector(getInfo);
  // @TODO replace bundleId with id/code once changed
  const loading = useSelector(getLoading)[`deployBundle${info.payload && info.payload.bundleId}`];

  const handleDeploy = () => {
    dispatch(sendDeployBundle(info.payload)).then(() => {
      dispatch(setVisibleModal(''));
    });
  };

  const buttons = [
    <Button bsStyle="primary" id="InstallationPlanModal__button-ok" disabled={loading} onClick={handleDeploy}>
      <FormattedMessage id="app.deploy" />
    </Button>,
  ];

  const modalTitle = (
    <Modal.Title><FormattedMessage id="hub.bundle.installation" /></Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={HUB_BUNDLE_MANAGEMENT_MODAL_ID}
      buttons={buttons}
      modalTitle={modalTitle}
      modalClassName="InstallationPlanModal"
      closeLabel="app.cancel"
    >
      <BundlePreview bundle={info.payload} />
    </GenericModalContainer>
  );
};

export default HubBundleManagementModal;
