import React from 'react';
import PropTypes from 'prop-types';
import CategoryFilterContainer from 'ui/digital-exchange/CategoryFilterContainer';

const Sidebar = ({ showCategoryFilter }) => (
  <div className="Sidebar">
    { showCategoryFilter ? <CategoryFilterContainer /> : '' }
  </div>
);

Sidebar.propTypes = {
  showCategoryFilter: PropTypes.bool.isRequired,
};

export default Sidebar;
