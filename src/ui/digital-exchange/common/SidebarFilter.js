import React from 'react';
import PropTypes from 'prop-types';

const SidebarFilter = ({ title, children }) => (
  <div className="SidebarFilter">
    <div className="SidebarFilter__title">
      <span>{title}</span>
    </div>
    <div className="SidebarFilter__body">
      { children }
    </div>
  </div>
);

SidebarFilter.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};


export default SidebarFilter;
