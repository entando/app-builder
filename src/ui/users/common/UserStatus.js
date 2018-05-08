import React from 'react';
import PropTypes from 'prop-types';


const UserStatus = ({ status, title }) => (
  <span className={`UserStatus--${status}`}>
    <i className="fa UserStatus__icon" title={title} />&nbsp;
    {title}
  </span>
);

UserStatus.propTypes = {
  status: PropTypes.oneOf(['active', 'disabled', 'inactive']).isRequired,
  title: PropTypes.string,
};

UserStatus.defaultProps = {
  title: '',
};

export default UserStatus;
