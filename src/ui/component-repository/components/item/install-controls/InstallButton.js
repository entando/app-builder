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

const compareSemanticVersions = (a, b) => {
  // 1. Split the strings into their parts.
  const a1 = a.split('.');
  const b1 = b.split('.');
  // 2. Contingency in case there's a 4th or 5th version
  const len = Math.min(a1.length, b1.length);
  // 3. Look through each version number and compare.
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < len; i++) {
    const a2 = +a1[i] || 0;
    const b2 = +b1[i] || 0;

    if (a2 !== b2) {
      return a2 > b2 ? 1 : -1;
    }
  }

  // 4. We hit this if the all checked versions so far are equal
  //
  return b1.length - a1.length;
};

const InstallButton = ({
  component,
  uninstallStatus,
  installationStatus,
  selectedVersion,
  onInstall,
  progress,
  intl,
  update,
}) => {
  const installing = jobProgressStatuses.includes(installationStatus);
  const uninstalling = jobProgressStatuses.includes(uninstallStatus);

  if (installing || uninstalling) {
    // this is necessary for avoiding javascript's decimal handling (e.g. try to check 0.55 * 100)
    const progressPercentage = Math.round(((progress * 100) + Number.EPSILON) * 100) / 100;
    return (
      <ProgressBar
        active
        bsStyle="success"
        now={100}
        label={`${intl.formatMessage({
          id: installing
            ? 'componentRepository.components.installing'
            : 'componentRepository.components.uninstalling',
        }, {
          version: selectedVersion,
        })}... ${progressPercentage}%`}
      />
    );
  }

  const showVersionDropdown = Array.isArray(component.versions) && component.versions.length > 1;
  const label = `componentRepository.components.${update ? 'update' : 'install'}`;

  if (update && component.versions && component.versions.length < 1) {
    return null;
  }

  return (
    <div className="ComponentListInstallButtons">
      {
        showVersionDropdown
          ? (
            <SplitButton
              bsStyle="primary"
              onSelect={version => onInstall(component, version)}
              onClick={() => onInstall(component, (component.latestVersion || {}).version)}
              id={component.code}
              title={<FormattedMessage id={label} />}
            >
              {component.versions.sort((a, b) => compareSemanticVersions(b.version, a.version))
                .map(({ version }) => (
                  <MenuItem key={version} eventKey={version}>{version}</MenuItem>
                ))}
            </SplitButton>
          )
          : (
            <Button
              bsStyle="primary"
              onClick={() => onInstall(component, (component.latestVersion || {}).version)}
            >
              <FormattedMessage id={label} />
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
  selectedVersion: PropTypes.string.isRequired,
  update: PropTypes.bool,
};

InstallButton.defaultProps = {
  update: false,
};

export default injectIntl(InstallButton);
