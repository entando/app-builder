import { rangeRight } from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import SidebarFilter from 'ui/digital-exchange/common/SidebarFilter';
import RatingFilterItem from 'ui/digital-exchange/RatingFilterItem';

const msgs = defineMessages({
  ratingFilterTitle: {
    id: 'digitalExchange.sidebar.ratingFilter.title',
    defaultMessage: 'Rating Filter Title',
  },
});

class RatingFilter extends Component {
  toggleRatingFilter(selectedRating) {
    const { rating, onSelect } = this.props;
    const selectedRatingOrNull = rating === selectedRating ? null : selectedRating;
    onSelect(selectedRatingOrNull);
  }

  render() {
    const {
      minRating,
      maxRating,
      rating,
      intl,
    } = this.props;

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
      <SidebarFilter title={intl.formatMessage(msgs.ratingFilterTitle)}>
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
  intl: intlShape.isRequired,
};

RatingFilter.defaultProps = {
  rating: null,
  minRating: 1,
  maxRating: 5,
};

export default injectIntl(RatingFilter);
