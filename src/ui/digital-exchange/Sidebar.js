import React from 'react';
import MarketplaceFilterContainer from 'ui/digital-exchange/MarketplaceFilterContainer';
import CategoryFilterContainer from 'ui/digital-exchange/CategoryFilterContainer';

const Sidebar = () => (
  <div className="Sidebar">
    <MarketplaceFilterContainer />
    <CategoryFilterContainer />
  </div>
);

export default Sidebar;
