import { range } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { formattedText } from '@entando/utils';
import StarIcon from 'ui/digital-exchange/common/StarIcon';

const RatingFilterItem = ({
  selected,
  rating,
  maxRating,
  onSelect,
}) => {
  const selectedClass = selected ? ' RatingFilterItem--selected' : '';
  const className = `RatingFilterItem${selectedClass}`;
  const enterKey = 'Enter';
  const itemLabel = formattedText('digitalExchange.sidebar.ratingFilter.itemLabel');
  return (
    <div
      role="button"
      tabIndex="0"
      className={className}
      onClick={() => onSelect(rating)}
      onKeyDown={e => e.key === enterKey && onSelect(rating)}
      aria-label={`${rating} ${itemLabel}`}
    >
      {
        range(maxRating).map(currentRating => (
          <StarIcon
            key={`rating-filter-star-${currentRating}`}
            filled={currentRating < rating}
            aria-hidden="true"
          />
        ))
      }
      <span aria-hidden="true">{itemLabel}</span>
    </div>
  );
};

RatingFilterItem.propTypes = {
  selected: PropTypes.bool,
  rating: PropTypes.number.isRequired,
  maxRating: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

RatingFilterItem.defaultProps = {
  selected: false,
};

export default RatingFilterItem;
