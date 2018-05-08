import React from 'react';
import { Alert } from 'patternfly-react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const ReloadConfirm = ({ status }) => {
  const alertType = status === 'success' ? 'success' : 'danger';

  return (
    <div className="ReloadConfirm">
      <Alert type={alertType}>
        <FormattedMessage id={`reloadConfiguration.confirm.${status}`} />
      </Alert>
    </div>
  );
};

ReloadConfirm.propTypes = {
  status: PropTypes.string,
};

ReloadConfirm.defaultProps = {
  status: 'error',
};

export default ReloadConfirm;
