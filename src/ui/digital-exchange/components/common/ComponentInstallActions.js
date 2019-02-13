import React from 'react';
import PropTypes from 'prop-types';
import { Button, ProgressBar } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { componentType } from 'models/digital-exchange/components';
import { DE_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS, DE_COMPONENT_INSTALLATION_STATUS_CREATED } from 'state/digital-exchange/components/const';

const installationProgressStatuses = [
  DE_COMPONENT_INSTALLATION_STATUS_CREATED,
  DE_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
];

const ComponentInstallActions = ({
  component,
  installationStatus,
  onInstall,
  onUninstall,
}) => (
  component.installed ? (
    <div className="ComponentListGridView__install-actions">
      <span className="ComponentListGridView__status">
        <FormattedMessage id="digitalExchange.components.installed" />
      </span>
      <Button
        bsStyle="link"
        className="ComponentListGridView__uninstall"
        onClick={() => onUninstall(component.id)}
      >
        <FormattedMessage id="digitalExchange.components.uninstall" />
      </Button>
    </div>
  ) : (
    <div className="ComponentListGridView__install-actions">
      {
        installationProgressStatuses.includes(installationStatus) ? (
          <ProgressBar
            active
            bsStyle="success"
            now={100}
          />
        ) : (
          <Button
            bsStyle="primary"
            className="ComponentListGridView__install"
            onClick={() => onInstall(component)}
          >
            <FormattedMessage id="digitalExchange.components.install" />
          </Button>
        )
      }
    </div>
  )
);

ComponentInstallActions.propTypes = {
  component: componentType.isRequired,
  installationStatus: PropTypes.string.isRequired,
  onInstall: PropTypes.func.isRequired,
  onUninstall: PropTypes.func.isRequired,
};

export default ComponentInstallActions;
