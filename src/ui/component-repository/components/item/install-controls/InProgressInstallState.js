import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

const InProgressInstallState = ({ onRecheckStatus }) => (
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
);

InProgressInstallState.propTypes = {
  onRecheckStatus: PropTypes.func.isRequired,
};

export default InProgressInstallState;
