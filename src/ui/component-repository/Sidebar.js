import React from 'react';
import PropTypes from 'prop-types';
import CategoryFilterContainer from 'ui/component-repository/CategoryFilterContainer';

const Sidebar = ({ showCategoryFilter }) => (
  <div className="Sidebar">
    { showCategoryFilter ? <CategoryFilterContainer /> : '' }
  </div>
);

Sidebar.propTypes = {
  showCategoryFilter: PropTypes.bool.isRequired,
};

export default Sidebar;
