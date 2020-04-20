import React from 'react';
import PropTypes from 'prop-types';

const StarIcon = ({ filled, filledHalf }) => {
  const filledClass = filled ? ' StarIcon--filled' : '';
  const icon = filledHalf ? 'fa-star-half' : 'fa-star';
  const className = `fa ${icon} StarIcon${filledClass}`;
  return <i className={className} />;
};

StarIcon.propTypes = {
  filled: PropTypes.bool,
  filledHalf: PropTypes.bool,
};

StarIcon.defaultProps = {
  filled: false,
  filledHalf: false,
};

export default StarIcon;
