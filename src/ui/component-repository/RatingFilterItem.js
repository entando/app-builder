import { range } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import StarIcon from 'ui/component-repository/common/StarIcon';

const msgs = defineMessages({
  itemLabel: {
    id: 'componentRepository.sidebar.ratingFilter.itemLabel',
    defaultMessage: 'Item Label',
  },
});

const RatingFilterItem = ({
  intl,
  selected,
  rating,
  maxRating,
  onSelect,
}) => {
  const selectedClass = selected ? ' RatingFilterItem--selected' : '';
  const className = `RatingFilterItem${selectedClass}`;
  const enterKey = 'Enter';
  const itemLabel = intl.formatMessage(msgs.itemLabel);
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
  intl: intlShape.isRequired,
  selected: PropTypes.bool,
  rating: PropTypes.number.isRequired,
  maxRating: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

RatingFilterItem.defaultProps = {
  selected: false,
};

export default injectIntl(RatingFilterItem);
