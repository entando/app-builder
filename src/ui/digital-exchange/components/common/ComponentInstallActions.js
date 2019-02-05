import React from 'react';
import PropTypes from 'prop-types';
import { Button, ProgressBar } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { componentType } from 'models/digital-exchange/components';
import { DE_COMPONENT_INSTALLATION_IN_PROGRESS } from 'state/digital-exchange/components/const';

const ComponentInstallActions = ({
  component,
  installationProgress,
  onInstall,
  onUninstall,
}) => (
  component.installed ? (
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
        installationProgress === DE_COMPONENT_INSTALLATION_IN_PROGRESS ? (
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
  )
);

ComponentInstallActions.propTypes = {
  component: componentType.isRequired,
  installationProgress: PropTypes.string.isRequired,
  onInstall: PropTypes.func.isRequired,
  onUninstall: PropTypes.func.isRequired,
};

export default ComponentInstallActions;
