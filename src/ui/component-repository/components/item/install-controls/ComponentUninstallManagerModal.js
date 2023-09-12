import React from 'react';
import { Button, Modal, Spinner } from 'patternfly-react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import { getComponentUsageList, getECRComponentLastInstallApiResponsePayload, getECRComponentSelected } from 'state/component-repository/components/selectors';
import { getLoading } from 'state/loading/selectors';
import ComponentUninstallStart from 'ui/component-repository/components/item/install-controls/ComponentUninstallStart';
import { componentUninstallOngoingProgress, setInstallUninstallProgress, setSelectedECRComponent, uninstallECRComponent } from 'state/component-repository/components/actions';

const ComponentUninstallManagerModal = () => {
  const componentUsageList = useSelector(getComponentUsageList);
  const selectedEcrComponent = useSelector(getECRComponentSelected);
  const lastInstallApiResponse = useSelector(state =>
    getECRComponentLastInstallApiResponsePayload(state, { component: selectedEcrComponent })) || {};
  const { progress, status: componentUninstallStatus } = lastInstallApiResponse;
  const usageDataLoading = useSelector(getLoading)['component-repository/component-usage'];
  const loadingUninstallAction = useSelector(getLoading)[`deComponentInstallUninstall-${(selectedEcrComponent || {}).code || ''}`];

  const cannotBeUninstalled = (componentUsageList || []).some(c => c.hasExternal);

  const dispatch = useDispatch();

  if (!selectedEcrComponent) return null;

  const onConfirmUninstall = () => {
    const pollStepFunction = (prg, payload) => {
      dispatch(setInstallUninstallProgress(prg));
      if (payload && payload.componentId) {
        // only needed for uninstall progress
        dispatch(componentUninstallOngoingProgress(payload.componentId, payload));
      }
    };
    dispatch(uninstallECRComponent(selectedEcrComponent.code, pollStepFunction));
  };

  const handleCloseModal = () => {
    dispatch(setSelectedECRComponent({}));
  };

  const buttons = !componentUninstallStatus && progress !== 1 ? [
    <Button
      bsStyle="primary"
      disabled={cannotBeUninstalled || usageDataLoading || loadingUninstallAction}
      type="submit"
      className="ComponentUninstallManagerModal__uninstall-button"
      id="ComponentUninstallManagerModal__uninstall-button"
      onClick={onConfirmUninstall}
    >
      {
        !loadingUninstallAction ? (
          <FormattedMessage id="componentRepository.components.uninstall" />
        ) : <Spinner loading size="sm" />
      }
    </Button>,
  ] : [];


  const modalTitle = (
    <Modal.Title><FormattedMessage id="hub.bundle.uninstallation" /></Modal.Title>
  );

  const renderContent = () => {
    if (usageDataLoading) {
      return (
        <Spinner loading size="lg" />
      );
    }
    return (<ComponentUninstallStart
      bundle={{
      name: (selectedEcrComponent.lastJob || {}).componentName || selectedEcrComponent.title,
      description: selectedEcrComponent.description,
      version: (selectedEcrComponent.installedJob || {}).componentVersion ||
      (selectedEcrComponent.latestVersion || {}).version,
      componentTypes: selectedEcrComponent.componentTypes,
    }}
      componentDependencies={cannotBeUninstalled ? componentUsageList : []}
      componentUninstallStatus={componentUninstallStatus}
      progress={progress}
      lastInstallApiResponse={lastInstallApiResponse}
      dependenciesPartiallyDeleted={
      (componentUsageList || []).some(c => c.exist === false)
      }
    />);
  };

  return (
    <GenericModalContainer
      modalId={`uninstall-manager-for-${selectedEcrComponent.code}`}
      buttons={buttons}
      cancelTextKey="app.close"
      className="ComponentUninstallManagerModal"
      modalTitle={modalTitle}
      modalCloseCleanup={handleCloseModal}
    >
      {
        renderContent()
      }
    </GenericModalContainer>
  );
};

export default ComponentUninstallManagerModal;
