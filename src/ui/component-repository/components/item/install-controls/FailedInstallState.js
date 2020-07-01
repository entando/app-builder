import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

import { componentType } from 'models/component-repository/components';

const FailedInstallState = ({ component, onRetryAction }) => (
  <div className="ComponentList__install-actions">
    <span className="ComponentList__status ComponentList__status-danger">
      <FormattedMessage
        id={
          `componentRepository.components.${component.installed ? 'failedUninstall' : 'failedInstall'}`
        }
      />
    </span>
    <Button
      bsStyle="link"
      className="ComponentList__uninstall"
      onClick={onRetryAction}
    >
      <FormattedMessage id="componentRepository.components.retry" />
    </Button>
  </div>
);

FailedInstallState.propTypes = {
  component: componentType.isRequired,
  onRetryAction: PropTypes.func.isRequired,
};

export default FailedInstallState;
