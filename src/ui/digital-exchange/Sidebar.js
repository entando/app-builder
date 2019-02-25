import React from 'react';
import PropTypes from 'prop-types';
import DigitalExchangeFilterContainer from 'ui/digital-exchange/DigitalExchangeFilterContainer';
import CategoryFilterContainer from 'ui/digital-exchange/CategoryFilterContainer';
import RatingFilterContainer from 'ui/digital-exchange/RatingFilterContainer';

const Sidebar = ({ showCategoryFilter }) => (
  <div className="Sidebar">
    <DigitalExchangeFilterContainer />
    <RatingFilterContainer />
    { showCategoryFilter ? <CategoryFilterContainer /> : '' }
  </div>
);

Sidebar.propTypes = {
  showCategoryFilter: PropTypes.bool.isRequired,
};

export default Sidebar;
