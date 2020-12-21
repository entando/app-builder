import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'patternfly-react';
import { injectIntl } from 'react-intl';

import { componentType } from 'models/component-repository/components';
import { ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS } from 'state/component-repository/components/const';
import ConfirmUninstallModal from 'ui/component-repository/components/item/install-controls/ConfirmUninstallModal';
import InProgressInstallState from 'ui/component-repository/components/item/install-controls/InProgressInstallState';
import FailedInstallState from 'ui/component-repository/components/item/install-controls/FailedInstallState';
import InstallButton from 'ui/component-repository/components/item/install-controls/InstallButton';
import UninstallButton from 'ui/component-repository/components/item/install-controls/UninstallButton';

const ComponentInstallActions = ({
  component,
  lastInstallStatus,
  installationStatus,
  uninstallStatus,
  installUninstallLoading,
  componentUsageList,
  onInstall,
  onUninstall,
  onClickUninstall,
  onRecheckStatus,
  onRetryAction,
  progress,
}) => {
  const latestVersion = component.latestVersion.version;

  const [selectedVersion, setSelectedVersion] = useState(latestVersion);

  const handleInstall = (componentToInstall, version) => {
    setSelectedVersion(version || latestVersion);
    onInstall(componentToInstall, version);
  };

  const handleUninstall = () => {
    setSelectedVersion(component.installedJob.componentVersion);
    onUninstall(component.code);
  };

  if (lastInstallStatus) {
    return (
      (lastInstallStatus === ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS)
        ? <InProgressInstallState onRecheckStatus={onRecheckStatus} />
        : <FailedInstallState component={component} onRetryAction={onRetryAction} />
    );
  }

  const renderedButton = (component.installed && uninstallStatus === '')
    ? (<UninstallButton
      component={component}
      onClickUninstall={onClickUninstall}
    />)
    : (
      <InstallButton
        component={component}
        onInstall={handleInstall}
        uninstallStatus={uninstallStatus}
        installationStatus={installationStatus}
        progress={progress}
        selectedVersion={selectedVersion}
      />
    );

  return (
    <div className="ComponentList__install-actions">
      <Spinner loading={installUninstallLoading}>
        {renderedButton}
      </Spinner>
      <ConfirmUninstallModal
        info={{
          code: component.code,
          name: component.title,
          usageList: componentUsageList,
        }}
        onConfirmUninstall={handleUninstall}
      />
    </div>
  );
};

ComponentInstallActions.propTypes = {
  component: componentType.isRequired,
  installationStatus: PropTypes.string.isRequired,
  lastInstallStatus: PropTypes.string.isRequired,
  onInstall: PropTypes.func.isRequired,
  onUninstall: PropTypes.func.isRequired,
  onClickUninstall: PropTypes.func.isRequired,
  uninstallStatus: PropTypes.string.isRequired,
  onRecheckStatus: PropTypes.func.isRequired,
  onRetryAction: PropTypes.func.isRequired,
  installUninstallLoading: PropTypes.bool.isRequired,
  componentUsageList: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    usage: PropTypes.number.isRequired,
  })).isRequired,
  progress: PropTypes.number,
};

ComponentInstallActions.defaultProps = {
  progress: 0,
};

export default injectIntl(ComponentInstallActions);
