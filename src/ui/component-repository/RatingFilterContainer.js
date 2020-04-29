import { connect } from 'react-redux';
import RatingFilter from 'ui/component-repository/RatingFilter';
import { filterByRating } from 'state/component-repository/actions';
import { getECRRatingFilter } from 'state/component-repository/components/selectors';

export const mapDispatchToProps = dispatch => ({
  onSelect: (rating) => {
    dispatch(filterByRating(rating));
  },
});

export const mapStateToProps = state => ({
  rating: getECRRatingFilter(state),
});

const RatingFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false,
  },
)(RatingFilter);

export default RatingFilterContainer;
