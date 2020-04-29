import { range } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import StarIcon from 'ui/component-repository/common/StarIcon';

const StarRating = ({ rating }) => {
  const roundedRating = Math.round(rating);
  return (
    <div aria-label={roundedRating}>
      {
        range(rating).map(currentRating => (
          <StarIcon
            key={`rating-filter-star-${currentRating}`}
            filled={currentRating < rating}
            filledHalf={roundedRating === currentRating && currentRating < rating}
            aria-hidden="true"
          />
        ))
      }
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
