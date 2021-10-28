import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'patternfly-react';
import { injectIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import { componentType } from 'models/component-repository/components';
import { ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS } from 'state/component-repository/components/const';
import { setVisibleModal } from 'state/modal/actions';
import ConfirmUninstallModal from 'ui/component-repository/components/item/install-controls/ConfirmUninstallModal';
import InProgressInstallState from 'ui/component-repository/components/item/install-controls/InProgressInstallState';
import FailedInstallState from 'ui/component-repository/components/item/install-controls/FailedInstallState';
import InstallButton from 'ui/component-repository/components/item/install-controls/InstallButton';
import UninstallButton from 'ui/component-repository/components/item/install-controls/UninstallButton';
import ConfirmDowngradeModal from './ConfirmDowngradeModal';

const parseVersion = (version) => {
  if (typeof version !== 'string') {
    return '0.0.0';
  }
  return version.indexOf('v') > 0 ? version.split('v')[1] : version;
};

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
  const dispatch = useDispatch();
  const latestVersion = (component.latestVersion || {}).version;

  const [selectedVersion, setSelectedVersion] = useState(latestVersion);
  const [isConflictVersion, setIsConflictVersion] = useState(false);

  const handleInstall = (componentToInstall, version) => {
    setSelectedVersion(version || latestVersion);
    onInstall(componentToInstall, version);
    setIsConflictVersion(false);
  };

  const handleUpdate = (componentToInstall, version) => {
    if (component.installed
      && component.installedJob
      && parseVersion(version) < parseVersion(component.installedJob.componentVersion)) {
      setSelectedVersion(version || latestVersion);
      dispatch(setVisibleModal(`downgrade-${componentToInstall.code}`));
    } else if (parseVersion(version) === parseVersion(component.installedJob.componentVersion)) {
      setSelectedVersion(version || latestVersion);
      dispatch(setVisibleModal(`downgrade-${componentToInstall.code}`));
      setIsConflictVersion(true);
    } else {
      handleInstall(componentToInstall, version);
    }
  };

  const handleUninstall = () => {
    setSelectedVersion(component.installedJob.componentVersion);
    onUninstall(component.code);
  };

  if (lastInstallStatus) {
    return (
      (lastInstallStatus === ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS)
        ? <InProgressInstallState onRecheckStatus={onRecheckStatus} />
        : <FailedInstallState
          component={component}
          selectedVersion={selectedVersion}
          setSelectedVersion={setSelectedVersion}
          onRetryAction={onRetryAction}
        />
    );
  }

  const renderedButton = (component.installed && uninstallStatus === '')
    ? (
      <div className="ComponentList__buttons-container">
        <InstallButton
          component={component}
          onInstall={handleUpdate}
          uninstallStatus={uninstallStatus}
          installationStatus={installationStatus}
          progress={progress}
          selectedVersion={selectedVersion}
          update
        />
        <UninstallButton
          component={component}
          onClickUninstall={onClickUninstall}
        />
      </div>
    )
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
        modalId="confirmComponentUninstallModal"
        info={{
          code: component.code,
          name: component.title,
          usageList: componentUsageList,
        }}
        onConfirmUninstall={handleUninstall}
      />
      <ConfirmDowngradeModal
        onConfirm={handleInstall}
        selectedVersion={selectedVersion}
        component={component}
        isConflictVersion={isConflictVersion}
        cleanUp={() => setIsConflictVersion(false)}
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
