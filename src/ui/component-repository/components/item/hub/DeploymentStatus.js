import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Label } from 'patternfly-react';
import { getDeployStatusColorCode } from 'ui/component-repository/components/list/HubBundleManagementModal';
import { NOT_FOUND } from 'state/component-repository/hub/const';

const DeploymentStatus = ({ bundleStatus }) => {
  if (!bundleStatus || !bundleStatus.status) return null;
  return (
    <div className="ComponentList__version-container">
      <span className="ComponentList__version">
        <Label
          bsStyle={getDeployStatusColorCode(bundleStatus.status)}
        >
          {bundleStatus.status === NOT_FOUND ? <FormattedMessage id="hub.bundle.UNDEPLOYED" /> :
          <FormattedMessage id={`hub.bundle.${bundleStatus.status}`} />}
        </Label>
      </span>
    </div>
  );
};

DeploymentStatus.propTypes = {
  bundleStatus: PropTypes.shape({
    status: PropTypes.string,
  }),
};

DeploymentStatus.defaultProps = {
  bundleStatus: undefined,
};

export default DeploymentStatus;
