import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, ProgressBar, Spinner } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { componentType } from 'models/component-repository/components';
import {
  ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
  ECR_COMPONENT_INSTALLATION_STATUS_CREATED,
  ECR_COMPONENT_UNINSTALLATION_STATUS_CREATED,
  ECR_COMPONENT_UNINSTALLATION_STATUS_IN_PROGRESS,
} from 'state/component-repository/components/const';

const jobProgressStatuses = [
  ECR_COMPONENT_INSTALLATION_STATUS_CREATED,
  ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
  ECR_COMPONENT_UNINSTALLATION_STATUS_CREATED,
  ECR_COMPONENT_UNINSTALLATION_STATUS_IN_PROGRESS,
];

const ComponentInstallActions = ({
  component,
  lastInstallStatus,
  installationStatus,
  uninstallStatus,
  installUninstallLoading,
  onInstall,
  onUninstall,
  onRecheckStatus,
  onRetryAction,
}) => {
  if (lastInstallStatus) {
    return (
      (lastInstallStatus === ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS) ? (
        <div className="ComponentList__install-actions">
          <span className="ComponentList__status ComponentList__status-caution">
            <FormattedMessage id="componentRepository.components.inprogress" />
          </span>
          <Button
            bsStyle="link"
            className="ComponentList__uninstall"
            onClick={onRecheckStatus}
          >
            <FormattedMessage id="componentRepository.components.recheck" />
          </Button>
        </div>
      ) : (
        <div className="ComponentList__install-actions">
          <span className="ComponentList__status ComponentList__status-danger">
            <FormattedMessage id={`componentRepository.components.${component.installed ? 'failedUninstall' : 'failedInstall'}`} />
          </span>
          <Button
            bsStyle="link"
            className="ComponentList__uninstall"
            onClick={onRetryAction}
          >
            <FormattedMessage id="componentRepository.components.retry" />
          </Button>
        </div>
      )
    );
  }

  const renderedUninstallButton = (
    <Fragment>
      <span className="ComponentList__status">
        <FormattedMessage id="componentRepository.components.installed" />
      </span>
      <Button
        bsStyle="link"
        className="ComponentList__uninstall"
        onClick={() => onUninstall(component.id)}
      >
        <FormattedMessage id="componentRepository.components.uninstall" />
      </Button>
    </Fragment>
  );

  const renderedInstallButton = (
    jobProgressStatuses.includes(installationStatus) ||
    jobProgressStatuses.includes(uninstallStatus) ? (
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
          <FormattedMessage id="componentRepository.components.install" />
        </Button>
      )
  );

  const renderedButton = (component.installed && uninstallStatus === '')
    ? renderedUninstallButton
    : renderedInstallButton;

  return (
    <div className="ComponentList__install-actions">
      <Spinner loading={installUninstallLoading}>
        {renderedButton}
      </Spinner>
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
  installUninstallLoading: PropTypes.bool.isRequired,
};

export default ComponentInstallActions;
