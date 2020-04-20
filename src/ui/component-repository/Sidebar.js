import React from 'react';
import PropTypes from 'prop-types';
import ComponentRepositoryFilterContainer from 'ui/component-repository/ComponentRepositoryFilterContainer';
import CategoryFilterContainer from 'ui/component-repository/CategoryFilterContainer';
import RatingFilterContainer from 'ui/component-repository/RatingFilterContainer';

const Sidebar = ({ showCategoryFilter }) => (
  <div className="Sidebar">
    <ComponentRepositoryFilterContainer />
    <RatingFilterContainer />
    { showCategoryFilter ? <CategoryFilterContainer /> : '' }
  </div>
);

Sidebar.propTypes = {
  showCategoryFilter: PropTypes.bool.isRequired,
};

export default Sidebar;
