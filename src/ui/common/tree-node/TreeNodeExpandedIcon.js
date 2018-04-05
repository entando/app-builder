import React from 'react';
import PropTypes from 'prop-types';


const TreeNodeExpandedIcon = ({ expanded }) => (
  <i className={`fa ${expanded ? 'fa-angle-down' : 'fa-angle-right'} TreeNodeExpandedIcon`} />
);

TreeNodeExpandedIcon.propTypes = {
  expanded: PropTypes.bool,
};

TreeNodeExpandedIcon.defaultProps = {
  expanded: false,
};

export default TreeNodeExpandedIcon;
