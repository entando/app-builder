import React from 'react';
import PropTypes from 'prop-types';
import MarketplaceFilterContainer from 'ui/digital-exchange/MarketplaceFilterContainer';
import CategoryFilterContainer from 'ui/digital-exchange/CategoryFilterContainer';
import RatingFilterContainer from 'ui/digital-exchange/RatingFilterContainer';

const Sidebar = ({ showCategoryFilter }) => (
  <div className="Sidebar">
    <MarketplaceFilterContainer />
    <RatingFilterContainer />
    { showCategoryFilter ? <CategoryFilterContainer /> : '' }
  </div>
);

Sidebar.propTypes = {
  showCategoryFilter: PropTypes.bool.isRequired,
};

export default Sidebar;
