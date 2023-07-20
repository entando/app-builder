import React from 'react';
import { Button, Modal, Spinner } from 'patternfly-react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import { getComponentUsageList, getECRComponentSelected, getECRComponentUninstallStatus, getInstallUninstallProgress } from 'state/component-repository/components/selectors';
import { getLoading } from 'state/loading/selectors';
import ComponentUninstallStart from 'ui/component-repository/components/item/install-controls/ComponentUninstallStart';
import { setInstallUninstallProgress, uninstallECRComponent } from 'state/component-repository/components/actions';

const ComponentUninstallManagerModal = () => {
  const componentUsageList = useSelector(getComponentUsageList);
  const selectedEcrComponent = useSelector(getECRComponentSelected);
  const componentUninstallStatus =
  useSelector(state => getECRComponentUninstallStatus(state, { component: selectedEcrComponent }));
  const progress = useSelector(getInstallUninstallProgress);
  const usageDataLoading = useSelector(getLoading)['component-repository/component-usage'];
  const loadingUninstallAction = useSelector(getLoading)[`deComponentInstallUninstall-${(selectedEcrComponent || {}).code || ''}`];

  const cannotBeUninstalled = (componentUsageList || []).some(c => c.hasExternal);

  const dispatch = useDispatch();

  if (!selectedEcrComponent) return null;

  const onConfirmUninstall = () => {
    const pollStepFunction = prg => dispatch(setInstallUninstallProgress(prg));
    dispatch(uninstallECRComponent(selectedEcrComponent.code, pollStepFunction));
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
      name: selectedEcrComponent.title,
      description: selectedEcrComponent.description,
      version: (selectedEcrComponent.installedJob || {}).componentVersion ||
      (selectedEcrComponent.latestVersion || {}).version,
      componentTypes: selectedEcrComponent.componentTypes,
    }}
      componentDependencies={cannotBeUninstalled ? componentUsageList : []}
      componentUninstallStatus={componentUninstallStatus}
      progress={progress}
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
    >
      {
        renderContent()
      }
    </GenericModalContainer>
  );
};

export default ComponentUninstallManagerModal;
