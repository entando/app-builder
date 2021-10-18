import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, Spinner } from 'patternfly-react';

import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import BundlePreview from 'ui/component-repository/components/item/hub/BundlePreview';
import { getInfo } from 'state/modal/selectors';
import { sendDeployBundle, fetchSelectedBundleStatus } from 'state/component-repository/hub/actions';
import { getLoading } from 'state/loading/selectors';
import { getBundleGroups, getSelectedRegistry, getSelectedBundleStatus } from 'state/component-repository/hub/selectors';
import ComponentInstallActionsContainer from 'ui/component-repository/components/item/install-controls/ComponentInstallActionsContainer';
import { fetchECRComponentDetail } from 'state/component-repository/components/actions';
import { getECRComponentSelected } from 'state/component-repository/components/selectors';

export const HUB_BUNDLE_MANAGEMENT_MODAL_ID = 'HubBundleManagementModalId';

const HubBundleManagementModal = () => {
  const dispatch = useDispatch();
  const info = useSelector(getInfo);
  const activeRegistry = useSelector(getSelectedRegistry);
  const bundlegroups = useSelector(getBundleGroups);
  const selectedBundleStatus = useSelector(getSelectedBundleStatus);
  const loading = useSelector(getLoading)[`deployBundle${info.payload && info.payload.bundleId}`];
  const selectedECRComponent = useSelector(getECRComponentSelected);

  const bundleGroupNames = useMemo(() => {
    const bundleGroupIds = info.payload.bundleGroups;
    if (!bundleGroupIds) return [];
    const bundleGroups = bundleGroupIds.map((id) => {
      const group = bundlegroups.find(bg => bg.bundleGroupId === id);
      return group && group.name;
    });
    return bundleGroups;
  }, [bundlegroups, info.payload.bundleGroups]);

  useEffect(() => {
    dispatch(fetchSelectedBundleStatus(info.payload.gitRepoAddress));
  }, [dispatch, info.payload.gitRepoAddress]);

  const handleDeploy = () => {
    dispatch(sendDeployBundle(info.payload));
  };

  const bundleDeployedOrInstalled = selectedBundleStatus.status === 'DEPLOYED' || selectedBundleStatus.status === 'INSTALLED';

  useEffect(() => {
    if (bundleDeployedOrInstalled) {
      dispatch(fetchECRComponentDetail(info.payload.gitRepoAddress));
    }
  }, [bundleDeployedOrInstalled, dispatch, info.payload.gitRepoAddress]);

  const renderNotDeployedOrInstalled = selectedBundleStatus.status === 'NOT_FOUND' ?
    (
      <Button bsStyle="primary" id="InstallationPlanModal__button-ok" disabled={loading} onClick={handleDeploy}>
        <FormattedMessage id="app.deploy" />
      </Button>
    ) : <Spinner loading />;

  const modalFooter = (
    <Modal.Footer className="HubBundleManagement__modal-footer">
      <Spinner loading={loading || !selectedBundleStatus.status}>
        {
          bundleDeployedOrInstalled && selectedECRComponent ?
            <ComponentInstallActionsContainer component={info.payload} /> :
            renderNotDeployedOrInstalled
        }
      </Spinner>
    </Modal.Footer>
  );

  const modalTitle = (
    <Modal.Title><FormattedMessage id="hub.bundle.installation" /></Modal.Title>
  );

  const { payload } = info;

  return (
    <GenericModalContainer
      modalId={HUB_BUNDLE_MANAGEMENT_MODAL_ID}
      modalTitle={modalTitle}
      modalClassName="InstallationPlanModal"
      closeLabel="app.cancel"
      modalFooter={modalFooter}
    >
      <BundlePreview
        bundle={{
          name: payload.name || payload.title,
          description: payload.description,
          descriptionImage: payload.descriptionImage || payload.thumbnail,
        }}
        hubName={activeRegistry.name}
        bundleGroupNames={bundleGroupNames}
      />
    </GenericModalContainer>
  );
};

export default HubBundleManagementModal;
