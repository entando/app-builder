import { rangeRight } from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { formattedText } from '@entando/utils';
import SidebarFilter from 'ui/digital-exchange/common/SidebarFilter';
import RatingFilterItem from 'ui/digital-exchange/RatingFilterItem';

class RatingFilter extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rating: undefined,
    };
  }

  isSelected(rating) {
    return this.state.rating === rating;
  }

  toggleRatingFilter(currentRating) {
    const rating = this.isSelected(currentRating) ? undefined : currentRating;
    this.setState({ rating });
    this.props.onSelect(rating);
  }

  render() {
    const { minRating, maxRating } = this.props;
    const title = formattedText('digitalExchange.sidebar.ratingFilter.title');

    const ratingFilterItems = rangeRight(minRating, maxRating + 1).map(rating => (
      <li key={`rating-${rating}-filter`}>
        <RatingFilterItem
          onSelect={() => this.toggleRatingFilter(rating)}
          selected={this.isSelected(rating)}
          rating={rating}
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
  minRating: PropTypes.number,
  maxRating: PropTypes.number,
};

RatingFilter.defaultProps = {
  minRating: 1,
  maxRating: 5,
};

export default RatingFilter;
