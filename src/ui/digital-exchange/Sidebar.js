import React from 'react';
import PropTypes from 'prop-types';
import MarketplaceFilterContainer from 'ui/digital-exchange/MarketplaceFilterContainer';
import CategoryFilterContainer from 'ui/digital-exchange/CategoryFilterContainer';
import RatingFilterContainer from 'ui/digital-exchange/RatingFilterContainer';

const Sidebar = ({ topCategoryFilter }) => (
  <div className="Sidebar">
    <MarketplaceFilterContainer />
    <RatingFilterContainer />
    { topCategoryFilter.length ? '' : <CategoryFilterContainer /> }
  </div>
);

Sidebar.propTypes = {
  topCategoryFilter: PropTypes.arrayOf(PropTypes.string),
};

Sidebar.defaultProps = {
  topCategoryFilter: [],
};

export default Sidebar;
