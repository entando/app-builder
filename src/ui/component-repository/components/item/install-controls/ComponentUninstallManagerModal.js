import React from 'react';
import { Button, Modal, Spinner } from 'patternfly-react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';
import { getComponentUsageList, getECRComponentSelected } from 'state/component-repository/components/selectors';
import { getLoading } from 'state/loading/selectors';
import ComponentUninstallStart from 'ui/component-repository/components/item/install-controls/ComponentUninstallStart';

const ComponentUninstallManagerModal = () => {
  const componentUsageList = useSelector(getComponentUsageList);
  const usageDataLoading = useSelector(getLoading)['component-repository/component-usage'];
  const selectedEcrComponent = useSelector(getECRComponentSelected);

  const cannotBeUninstalled = (componentUsageList || []).some(c => c.hasExternal);

  if (!selectedEcrComponent) return null;

  const buttons = [
    <Button
      bsStyle="primary"
      disabled={cannotBeUninstalled}
      type="submit"
      className="ComponentUninstallManagerModal__uninstall-button"
      id="ComponentUninstallManagerModal__uninstall-button"
    >
      <FormattedMessage id="componentRepository.components.uninstall" />
    </Button>,
  ];


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
    />);
  };

  return (
    <GenericModalContainer
      modalId={`uninstall-manager-for-${selectedEcrComponent.code}`}
      buttons={buttons}
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
