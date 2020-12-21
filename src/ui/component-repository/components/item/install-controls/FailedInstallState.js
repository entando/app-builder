import React from 'react';
import PropTypes from 'prop-types';
import { Button, MenuItem, SplitButton } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import { componentType } from 'models/component-repository/components';

const FailedInstallState = ({ component, onRetryAction }) => {
  const showVersionDropdown = Array.isArray(component.versions) && component.versions.length > 1;
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
          showVersionDropdown
            ? (
              <SplitButton
                bsStyle="primary"
                onSelect={version => onRetryAction(version)}
                onClick={() => onRetryAction()}
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
                onClick={() => onRetryAction()}
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
};

export default FailedInstallState;
