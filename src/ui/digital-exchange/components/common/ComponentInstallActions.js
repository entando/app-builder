import React from 'react';
import PropTypes from 'prop-types';
import { Button, ProgressBar } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { componentType } from 'models/digital-exchange/components';
import {
  DE_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
  DE_COMPONENT_INSTALLATION_STATUS_CREATED,
} from 'state/digital-exchange/components/const';

const installationProgressStatuses = [
  DE_COMPONENT_INSTALLATION_STATUS_CREATED,
  DE_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
];

const ComponentInstallActions = ({
  component,
  lastInstallStatus,
  installationStatus,
  uninstallStatus,
  onInstall,
  onUninstall,
  onRecheckStatus,
  onRetryAction,
}) => {
  if (lastInstallStatus) {
    return (
      (lastInstallStatus === DE_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS) ? (
        <div className="ComponentList__install-actions">
          <span className="ComponentList__status ComponentList__status-caution">
            <FormattedMessage id="digitalExchange.components.inprogress" />
          </span>
          <Button
            bsStyle="link"
            className="ComponentList__uninstall"
            onClick={onRecheckStatus}
          >
            <FormattedMessage id="digitalExchange.components.recheck" />
          </Button>
        </div>
      ) : (
        <div className="ComponentList__install-actions">
          <span className="ComponentList__status ComponentList__status-danger">
            <FormattedMessage id={`digitalExchange.components.${component.installed ? 'failedUninstall' : 'failedInstall'}`} />
          </span>
          <Button
            bsStyle="link"
            className="ComponentList__uninstall"
            onClick={onRetryAction}
          >
            <FormattedMessage id="digitalExchange.components.retry" />
          </Button>
        </div>
      )
    );
  }

  return (component.installed && uninstallStatus === '') ? (
    <div className="ComponentList__install-actions">
      <span className="ComponentList__status">
        <FormattedMessage id="digitalExchange.components.installed" />
      </span>
      <Button
        bsStyle="link"
        className="ComponentList__uninstall"
        onClick={() => onUninstall(component.id)}
      >
        <FormattedMessage id="digitalExchange.components.uninstall" />
      </Button>
    </div>
  ) : (
    <div className="ComponentList__install-actions">
      {
        (installationProgressStatuses.includes(installationStatus) ||
        installationProgressStatuses.includes(uninstallStatus)) ? (
          <ProgressBar
            active
            bsStyle="success"
            now={100}
          />
        ) : (
          <Button
            bsStyle="primary"
            className="ComponentList__install"
            onClick={() => onInstall(component)}
          >
            <FormattedMessage id="digitalExchange.components.install" />
          </Button>
        )
      }
    </div>
  );
};

ComponentInstallActions.propTypes = {
  component: componentType.isRequired,
  installationStatus: PropTypes.string.isRequired,
  lastInstallStatus: PropTypes.string.isRequired,
  onInstall: PropTypes.func.isRequired,
  onUninstall: PropTypes.func.isRequired,
  uninstallStatus: PropTypes.string.isRequired,
  onRecheckStatus: PropTypes.func.isRequired,
  onRetryAction: PropTypes.func.isRequired,
};

export default ComponentInstallActions;
