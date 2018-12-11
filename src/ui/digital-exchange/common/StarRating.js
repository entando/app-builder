import { range } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import StarIcon from 'ui/digital-exchange/common/StarIcon';

const StarRating = ({ rating }) => (
  <div>
    {
        range(rating).map(currentRating => (
          <StarIcon
            key={`rating-filter-star-${currentRating}`}
            filled={currentRating < rating}
            filledHalf={Math.round(rating) === currentRating && currentRating < rating}
            aria-hidden="true"
          />
          ))
      }
  </div>
);

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
