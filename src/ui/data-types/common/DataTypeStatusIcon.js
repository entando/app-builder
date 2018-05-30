import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'patternfly-react';

const DataTypeStatusIcon = ({ status, title }) => {
  let icon;
  switch (parseFloat(status)) {
    case 1:
      icon = 'spinner';
      break;
    case 2:
      icon = 'exclamation';
      break;
    default:
      icon = 'check';
  }
  return (
    <Icon
      title={title}
      name={icon}
      type="fa"
      className={`DataTypeStatusIcon DataTypeStatusIcon--${icon}`}
    />
  );
};

DataTypeStatusIcon.propTypes = {
  status: PropTypes.oneOf(['0', '1', '2']).isRequired,
  title: PropTypes.string,
};

DataTypeStatusIcon.defaultProps = {
  title: '',
};

export default DataTypeStatusIcon;
