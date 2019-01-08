import { rangeRight } from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formattedText } from '@entando/utils';
import SidebarFilter from 'ui/digital-exchange/common/SidebarFilter';
import RatingFilterItem from 'ui/digital-exchange/RatingFilterItem';

class RatingFilter extends Component {
  toggleRatingFilter(selectedRating) {
    const { rating, onSelect } = this.props;
    const selectedRatingOrNull = rating === selectedRating ? null : selectedRating;
    onSelect(selectedRatingOrNull);
  }

  render() {
    const { minRating, maxRating, rating } = this.props;
    const title = formattedText('digitalExchange.sidebar.ratingFilter.title');

    const ratingFilterItems = rangeRight(minRating, maxRating + 1).map(itemRating => (
      <li key={`rating-${itemRating}-filter`}>
        <RatingFilterItem
          onSelect={() => this.toggleRatingFilter(itemRating)}
          selected={itemRating === rating}
          rating={itemRating}
          maxRating={maxRating}
        />
      </li>
    ));

    return (
      <SidebarFilter title={title}>
        <div className="RatingFilter">
          <ul>
            { ratingFilterItems }
          </ul>
        </div>
      </SidebarFilter>
    );
  }
}

RatingFilter.propTypes = {
  onSelect: PropTypes.func.isRequired,
  rating: PropTypes.number,
  minRating: PropTypes.number,
  maxRating: PropTypes.number,
};

RatingFilter.defaultProps = {
  rating: null,
  minRating: 1,
  maxRating: 5,
};

export default RatingFilter;
