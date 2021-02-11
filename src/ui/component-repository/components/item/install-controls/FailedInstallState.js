import React from 'react';
import PropTypes from 'prop-types';
import { Button, MenuItem, SplitButton } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import { componentType } from 'models/component-repository/components';

const FailedInstallState = ({
  component, onRetryAction, selectedVersion, setSelectedVersion,
}) => {
  const showVersionDropdown = Array.isArray(component.versions) && component.versions.length > 1;
  const showInstallVersions = showVersionDropdown && !component.installed;
  const handleRetry = (version) => {
    setSelectedVersion(version);
    onRetryAction(version);
  };
  return (
    <div className="ComponentList__install-actions ComponentList__failed-state">
      <span className="ComponentList__status ComponentList__status-danger">
        <FormattedMessage
          id={
            `componentRepository.components.${component.installed ? 'failedUninstall' : 'failedInstall'}`
          }
        />
      </span>
      <div className="ComponentListInstallButtons">
        {
        showInstallVersions ? (
          <React.Fragment>
            {
          showVersionDropdown
            ? (
              <SplitButton
                bsStyle="primary"
                onSelect={version => handleRetry(version)}
                onClick={() => handleRetry(selectedVersion)}
                id={component.code}
                title={<FormattedMessage id="componentRepository.components.retry" />}
              >
                {component.versions.map(({ version }) => (
                  <MenuItem key={version} eventKey={version}>{version}</MenuItem>
                ))}
              </SplitButton>
            )
            : (
              <Button
                bsStyle="primary"
                onClick={() => handleRetry(selectedVersion)}
              >
                <FormattedMessage id="componentRepository.components.retry" />
              </Button >
            )
          }
          </React.Fragment>
        ) : (
          <Button
            bsStyle="primary"
            onClick={() => handleRetry(selectedVersion)}
          >
            <FormattedMessage id="componentRepository.components.retry" />
          </Button >
        )
      }
      </div>
    </div>
  );
};

FailedInstallState.propTypes = {
  component: componentType.isRequired,
  onRetryAction: PropTypes.func.isRequired,
  selectedVersion: PropTypes.string,
  setSelectedVersion: PropTypes.func.isRequired,
};

FailedInstallState.defaultProps = {
  selectedVersion: '',
};

export default FailedInstallState;
