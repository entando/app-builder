import React from 'react';
import MarketplaceFilterContainer from 'ui/digital-exchange/MarketplaceFilterContainer';
import CategoryFilterContainer from 'ui/digital-exchange/CategoryFilterContainer';
import RatingFilterContainer from 'ui/digital-exchange/RatingFilterContainer';

const Sidebar = () => (
  <div className="Sidebar">
    <MarketplaceFilterContainer />
    <RatingFilterContainer />
    <CategoryFilterContainer />
  </div>
);

export default Sidebar;
