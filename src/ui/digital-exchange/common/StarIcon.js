import React from 'react';
import PropTypes from 'prop-types';

const StarIcon = ({ filled }) => {
  const filledClass = filled ? ' StarIcon--filled' : '';
  const className = `fa fa-star StarIcon${filledClass}`;
  return <i className={className} />;
};

StarIcon.propTypes = {
  filled: PropTypes.bool,
};

StarIcon.defaultProps = {
  filled: false,
};

export default StarIcon;
