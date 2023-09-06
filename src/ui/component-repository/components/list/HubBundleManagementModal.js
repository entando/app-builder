import React, { useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, Spinner } from 'patternfly-react';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import BundlePreview from 'ui/component-repository/components/item/hub/BundlePreview';
import { getInfo } from 'state/modal/selectors';
import { sendDeployBundle, fetchSelectedBundleStatus, setSelectedBundleStatus, sendUndeployBundle } from 'state/component-repository/hub/actions';
import { getLoading } from 'state/loading/selectors';
import { getBundleGroups, getSelectedRegistry, getSelectedBundleStatus } from 'state/component-repository/hub/selectors';
import ComponentInstallActionsContainer from 'ui/component-repository/components/item/install-controls/ComponentInstallActionsContainer';
import {
  // componentUninstallOngoingProgress,
  fetchECRComponentDetail,
  // pollECRComponentCurrentUninstallJob,
  // setInstallUninstallProgress,
  setSelectedECRComponent,
} from 'state/component-repository/components/actions';
import {
  getECRComponentList, getECRComponentSelected, getECRComponentInstallationStatus,
  getECRComponentUninstallStatus,
  getECRComponentLastInstallApiResponsePayload,
} from 'state/component-repository/components/selectors';
import { INSTALLED, INSTALLED_NOT_DEPLOYED, DEPLOYED, NOT_FOUND, INVALID_REPO_URL } from 'state/component-repository/hub/const';
import { ECR_LOCAL_REGISTRY_NAME } from 'state/component-repository/hub/reducer';
import { ECR_COMPONENT_CURRENT_JOB_STATUS_UNINSTALLING, ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS, ECR_COMPONENT_UNINSTALLATION_STATUS_IN_PROGRESS } from 'state/component-repository/components/const';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { setVisibleModal } from 'state/modal/actions';

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
  const loadingDeploy = useSelector(getLoading)[`deployBundle${payload && (payload.gitRepoAddress || payload.repoUrl)}`];
  const loadingUndeploy = useSelector(getLoading)[`undeployBundle${payload && (payload.gitRepoAddress || payload.repoUrl)}`];
  const loading = loadingDeploy || loadingUndeploy;
  const selectedECRComponent = useSelector(getECRComponentSelected);
  const loadingInstallUninstallAction = useSelector(getLoading)[`deComponentInstallUninstall-${(selectedECRComponent || {}).code || ''}`];
  const ecrComponents = useSelector(getECRComponentList);

  const [redeployed, setRedeployed] = useState(false);
  const [fetchingDetails, setFetchingDetails] = useState(false);

  const ecrComponent = useMemo(
    () => selectedECRComponent && ecrComponents.find(c => c.code === selectedECRComponent.code),
    [ecrComponents, selectedECRComponent],
  );

  const component = { ...(selectedECRComponent || {}), ...(ecrComponent || {}) };
  const lastInstallApiResponse = useSelector(state =>
    getECRComponentLastInstallApiResponsePayload(state, { component })) || {};
  const isComponentInstalling =
    useSelector(state => getECRComponentInstallationStatus(state, {
      component:
        { code: component.code },
    })) === ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS;
  const isComponentUninstalling =
    useSelector(state => getECRComponentUninstallStatus(state, {
      component:
        { code: component.code },
    })) === ECR_COMPONENT_UNINSTALLATION_STATUS_IN_PROGRESS;

  const belongingBundleGroup = useMemo(() => {
    const belongingBundleGroups = bundlegroups
      .filter(bg => (payload.bundleGroups || []).includes(bg.bundleGroupId));
    return belongingBundleGroups[0] || {};
  }, [bundlegroups, payload.bundleGroups]);

  const handleDeploy = () => {
    const {
      name, gitRepoAddress, descriptionImage, bundleId,
    } = payload;

    const groupsWithName = bundlegroups.reduce((acc, bundle) => {
      if (bundle.children && bundle.children.some(id => id === bundleId)) {
        return [...acc, { id: bundle.bundleGroupId, name: bundle.name }];
      }
      return acc;
    }, []);

    dispatch(sendDeployBundle({
      name, gitRepoAddress, descriptionImage, bundleId, bundleGroups: groupsWithName,
    }));
  };

  const handleReDeploy = () => {
    const {
      name,
      repoUrl,
      descriptionImage,
      thumbnail,
      gitRepoAddress,
    } = payload;
    dispatch(sendDeployBundle({
      name,
      gitRepoAddress: gitRepoAddress || repoUrl,
      descriptionImage: descriptionImage || thumbnail,
    }, 'componentRepository.bundle.installVersionsRefreshed', true)).then(() => {
      setRedeployed(true);
    });
  };

  const handleUndeploy = () => {
    const { name, gitRepoAddress, descriptionImage } = payload;
    dispatch(sendUndeployBundle({
      name,
      gitRepoAddress,
      descriptionImage,
      componentCode: component.code,
      componentUrl: component.repoUrl,
      triggeredFromLocal: activeRegistry.name === ECR_LOCAL_REGISTRY_NAME,
    }));
  };

  const handleCloseModal = () => {
    dispatch(setSelectedBundleStatus({}));
    dispatch(setSelectedECRComponent({}));
  };

  const bundleDeployedOrInstalled = INSTALLED_OR_DEPLOYED.includes(selectedBundleStatus.status);
  useEffect(() => {
    dispatch(fetchSelectedBundleStatus(payload.gitRepoAddress || payload.repoUrl));
  }, [dispatch, payload, payload.gitRepoAddress, payload.repoUrl]);

  useEffect(() => {
    if ((selectedBundleStatus.status || redeployed) && !fetchingDetails) {
      setFetchingDetails(true);
      dispatch(fetchECRComponentDetail(Buffer.from(payload.gitRepoAddress || payload.repoUrl || '').toString('base64'))).finally(() => {
        setFetchingDetails(false);
      });
      if (redeployed) {
        setRedeployed(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, payload.gitRepoAddress, payload.repoUrl, selectedBundleStatus.status,
    redeployed]);

  // useEffect(() => {
  //   const pollStepFunction = (progress, newPayload) => {
  //     dispatch(setInstallUninstallProgress(progress));
  //     if (newPayload && newPayload.componentId) {
  //       dispatch(componentUninstallOngoingProgress(newPayload.componentId, newPayload));
  //     }
  //   };
  //   if (component && component.code) {
  //     dispatch(pollECRComponentCurrentUninstallJob(component.code, pollStepFunction, true));
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch, component.code]);

  useEffect(() => {
    if (lastInstallApiResponse &&
      (lastInstallApiResponse.status === ECR_COMPONENT_UNINSTALLATION_STATUS_IN_PROGRESS
      ||
      lastInstallApiResponse.status === ECR_COMPONENT_CURRENT_JOB_STATUS_UNINSTALLING)
    ) {
      dispatch(setVisibleModal(`uninstall-manager-for-${component.code}`));
    }
  }, [component.code, dispatch, lastInstallApiResponse]);

  const refreshVersionsButton = (
    <OverlayTrigger
      placement="top"
      overlay={(
        <Tooltip key={`tooltip-${component && component.code}-content-for-version-refresh`} className="Contents__tablerow-tooltip">
          <FormattedMessage id="componentRepository.refreshBundleVersions" />
        </Tooltip>
      )}
      key={`tooltip-${component && component.code}-overlay-for-version-refresh`}
    >
      <Button
        bsStyle="primary"
        id="InstallationPlanModal__refresh-versions"
        className="InstallationPlanModal__refresh-versions"
        disabled={loading || isComponentInstalling ||
          isComponentUninstalling || loadingInstallUninstallAction}
        onClick={handleReDeploy}
      >
        <span className="fa fa-refresh" />
      </Button>
    </OverlayTrigger>
  );

  const deployButton = (
    <Button bsStyle="primary" id="InstallationPlanModal__button-ok" disabled={loading} onClick={handleDeploy}>
      <FormattedMessage id="app.deploy" />
    </Button>
  );

  const undeployButton = (
    <Button
      bsStyle="danger"
      id="InstallationPlanModal__button-ok"
      disabled={loading || isComponentInstalling ||
        isComponentUninstalling || loadingInstallUninstallAction}
      onClick={handleUndeploy}
    >
      <FormattedMessage id="app.undeploy" />
    </Button>
  );

  const renderHubActions = () => {
    switch (selectedBundleStatus.status) {
      case DEPLOYED: {
        if (isComponentInstalling || isComponentUninstalling) return null;
        return undeployButton;
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
            (selectedBundleStatus.status === INSTALLED || selectedBundleStatus.status === DEPLOYED)
            && (
              refreshVersionsButton
            )
          }
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
          name: payload.name || payload.title || component.name || component.title,
          description: payload.description,
          descriptionImage: payload.descriptionImage || payload.thumbnail,
        }}
        hubName={activeRegistry.name}
        bundleGroup={belongingBundleGroup}
      />
    </GenericModalContainer>
  );
};

export default HubBundleManagementModal;
