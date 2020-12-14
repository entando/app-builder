import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { Button, ProgressBar, SplitButton, MenuItem } from 'patternfly-react';

import {
  ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
  ECR_COMPONENT_INSTALLATION_STATUS_CREATED,
  ECR_COMPONENT_UNINSTALLATION_STATUS_CREATED,
  ECR_COMPONENT_UNINSTALLATION_STATUS_IN_PROGRESS,
} from 'state/component-repository/components/const';
import { componentType } from 'models/component-repository/components';

const jobProgressStatuses = [
  ECR_COMPONENT_INSTALLATION_STATUS_CREATED,
  ECR_COMPONENT_INSTALLATION_STATUS_IN_PROGRESS,
  ECR_COMPONENT_UNINSTALLATION_STATUS_CREATED,
  ECR_COMPONENT_UNINSTALLATION_STATUS_IN_PROGRESS,
];

const InstallButton = ({
  component,
  uninstallStatus,
  installationStatus,
  onInstall,
  progress,
  intl,
}) => {
  if (
    jobProgressStatuses.includes(installationStatus)
    || jobProgressStatuses.includes(uninstallStatus)
  ) {
    // this is necessary for avoiding javascript's decimal handling (e.g. try to check 0.55 * 100)
    const progressPercentage = Math.round(((progress * 100) + Number.EPSILON) * 100) / 100;
    return (
      <ProgressBar
        active
        bsStyle="success"
        now={100}
        label={`${intl.formatMessage({ id: 'app.loading' })}... ${progressPercentage}%`}
      />
    );
  }

  const showVersionDropdown = Array.isArray(component.versions) && component.versions.length > 1;

  return (
    <div className="ComponentListInstallButtons">
      {
        showVersionDropdown
          ? (
            <SplitButton
              bsStyle="primary"
              onSelect={version => onInstall(component, version)}
              onClick={() => onInstall(component)}
              id={component.code}
              title={<FormattedMessage id="componentRepository.components.install" />}
            >
              {component.versions.map(({ version }) => (
                <MenuItem key={version} eventKey={version}>{version}</MenuItem>
              ))}
            </SplitButton>
          )
          : (
            <Button
              bsStyle="primary"
              onClick={() => onInstall(component)}
            >
              <FormattedMessage id="componentRepository.components.install" />
            </Button >
          )
        }
    </div>
  );
};

InstallButton.propTypes = {
  intl: intlShape.isRequired,
  component: componentType.isRequired,
  onInstall: PropTypes.func.isRequired,
  installationStatus: PropTypes.string.isRequired,
  uninstallStatus: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
};

export default injectIntl(InstallButton);
