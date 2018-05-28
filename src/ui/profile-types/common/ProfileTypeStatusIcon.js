import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'patternfly-react';

const ProfileTypeStatusIcon = ({ status, title }) => {
  let icon;
  switch (status) {
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
    <Icon title={title} name={icon} type="fa" />
  );
};

ProfileTypeStatusIcon.propTypes = {
  status: PropTypes.oneOf(['0', '1', '2']).isRequired,
  title: PropTypes.string,
};

ProfileTypeStatusIcon.defaultProps = {
  title: '',
};

export default ProfileTypeStatusIcon;
