import React from 'react';
import PropTypes from 'prop-types';


const CategoryExpandedIcon = ({ expanded }) => (
  <i className={`fa ${expanded ? 'fa-angle-down' : 'fa-angle-right'} CategoryExpandedIcon`} />
);

CategoryExpandedIcon.propTypes = {
  expanded: PropTypes.bool,
};

CategoryExpandedIcon.defaultProps = {
  expanded: false,
};

export default CategoryExpandedIcon;
