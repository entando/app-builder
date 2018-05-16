import React from 'react';
import PropTypes from 'prop-types';

const ProfileTypeStatusIcon = ({ status, title }) => (
  <i className={`fa ProfileTypeStatusIcon ProfileTypeStatusIcon--${status}`} title={title} />
);

ProfileTypeStatusIcon.propTypes = {
  status: PropTypes.oneOf(['ok', 'ko', 'wip']).isRequired,
  title: PropTypes.string,
};

ProfileTypeStatusIcon.defaultProps = {
  title: '',
};

export default ProfileTypeStatusIcon;
