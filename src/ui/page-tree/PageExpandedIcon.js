import React from 'react';
import PropTypes from 'prop-types';


const PageExpandedIcon = ({ expanded }) => (
  <i className={`fa ${expanded ? 'fa-angle-down' : 'fa-angle-right'} PageExpandedIcon`} />
);

PageExpandedIcon.propTypes = {
  expanded: PropTypes.bool,
};

PageExpandedIcon.defaultProps = {
  expanded: false,
};

export default PageExpandedIcon;
