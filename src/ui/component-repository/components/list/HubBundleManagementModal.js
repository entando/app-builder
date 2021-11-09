import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, Spinner } from 'patternfly-react';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import BundlePreview from 'ui/component-repository/components/item/hub/BundlePreview';
import { getInfo } from 'state/modal/selectors';
import { sendDeployBundle, fetchSelectedBundleStatus, setSelectedBundleStatus } from 'state/component-repository/hub/actions';
import { getLoading } from 'state/loading/selectors';
import { getBundleGroups, getSelectedRegistry, getSelectedBundleStatus } from 'state/component-repository/hub/selectors';
import ComponentInstallActionsContainer from 'ui/component-repository/components/item/install-controls/ComponentInstallActionsContainer';
import {
  fetchECRComponentDetail,
  setSelectedECRComponent,
} from 'state/component-repository/components/actions';
import { getECRComponentList, getECRComponentSelected } from 'state/component-repository/components/selectors';
import { INSTALLED, INSTALLED_NOT_DEPLOYED, DEPLOYED, NOT_FOUND, INVALID_REPO_URL } from 'state/component-repository/hub/const';

export const HUB_BUNDLE_MANAGEMENT_MODAL_ID = 'HubBundleManagementModalId';

const INSTALLED_OR_DEPLOYED = [DEPLOYED, INSTALLED, INSTALLED_NOT_DEPLOYED];

export const getDeployStatusColorCode = (status) => {
  switch (status) {
    case DEPLOYED:
      return 'primary';
    case INSTALLED_NOT_DEPLOYED:
    case INSTALLED:
      return 'success';
    case INVALID_REPO_URL:
      return 'danger';
    case NOT_FOUND:
      return 'default';
    default: return 'default';
  }
};

const HubBundleManagementModal = () => {
  const dispatch = useDispatch();
  const info = useSelector(getInfo);
  const { payload } = info;
  const activeRegistry = useSelector(getSelectedRegistry);
  const bundlegroups = useSelector(getBundleGroups);
  const selectedBundleStatus = useSelector(getSelectedBundleStatus);
  const loading = useSelector(getLoading)[`deployBundle${payload && payload.gitRepoAddress}`];
  const selectedECRComponent = useSelector(getECRComponentSelected);
  const ecrComponents = useSelector(getECRComponentList);

  const ecrComponent = useMemo(
    () => selectedECRComponent && ecrComponents.find(c => c.code === selectedECRComponent.code),
    [ecrComponents, selectedECRComponent],
  );

  const component = ecrComponent || selectedECRComponent;

  const bundleGroupNames = useMemo(() => {
    const bundleGroupIds = payload.bundleGroups;
    if (!bundleGroupIds) return [];
    const bundleGroups = bundleGroupIds.map((id) => {
      const group = bundlegroups.find(bg => bg.bundleGroupId === id);
      return group && group.name;
    });
    return bundleGroups;
  }, [bundlegroups, payload.bundleGroups]);

  const handleDeploy = () => {
    const { name, gitRepoAddress, descriptionImage } = payload;
    dispatch(sendDeployBundle({ name, gitRepoAddress, descriptionImage }));
  };

  const handleCloseModal = () => {
    dispatch(setSelectedBundleStatus({}));
    dispatch(setSelectedECRComponent({}));
  };

  const bundleDeployedOrInstalled = INSTALLED_OR_DEPLOYED.includes(selectedBundleStatus.status);

  useEffect(() => {
    dispatch(fetchSelectedBundleStatus(payload.gitRepoAddress || payload.repoUrl));
  }, [dispatch, payload.gitRepoAddress, payload.repoUrl]);

  useEffect(() => {
    if (selectedBundleStatus.status) {
      dispatch(fetchECRComponentDetail(Buffer.from(payload.gitRepoAddress || payload.repoUrl).toString('base64')));
    }
  }, [dispatch, payload.gitRepoAddress, payload.repoUrl, selectedBundleStatus.status]);

  const deployButton = (
    <Button bsStyle="primary" id="InstallationPlanModal__button-ok" disabled={loading} onClick={handleDeploy}>
      <FormattedMessage id="app.deploy" />
    </Button>
  );

  const renderHubActions = () => {
    switch (selectedBundleStatus.status) {
      case DEPLOYED: {
        return null;
      }
      case INSTALLED: {
        return null;
      }
      case INSTALLED_NOT_DEPLOYED: {
        return deployButton;
      }
      case NOT_FOUND: {
        return deployButton;
      }
      default: return null;
    }
  };

  const modalFooter = (
    <Modal.Footer className="HubBundleManagement__modal-footer">
      <Spinner loading={loading || !selectedBundleStatus.status}>
        <div className="HubBundleManagement__action-buttons">
          {
            bundleDeployedOrInstalled && component &&
              <ComponentInstallActionsContainer component={component} />
            }
          <div className="HubBundleManagement__deploy-action">
            {renderHubActions()}
          </div>
        </div>
      </Spinner>
    </Modal.Footer>
  );

  const modalTitle = (
    <Modal.Title><FormattedMessage id="hub.bundle.installation" /></Modal.Title>
  );

  return (
    <GenericModalContainer
      modalId={HUB_BUNDLE_MANAGEMENT_MODAL_ID}
      modalTitle={modalTitle}
      modalClassName="InstallationPlanModal"
      closeLabel="app.cancel"
      modalFooter={modalFooter}
      modalCloseCleanup={handleCloseModal}
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
