import { connect } from 'react-redux';
import RatingFilter from 'ui/digital-exchange/RatingFilter';
import { filterByRating } from 'state/digital-exchange/actions';
import { getDERatingFilter } from 'state/digital-exchange/components/selectors';

export const mapDispatchToProps = dispatch => ({
  onSelect: (rating) => {
    dispatch(filterByRating(rating));
  },
});

export const mapStateToProps = state => ({
  rating: getDERatingFilter(state),
});

const RatingFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatingFilter);

export default RatingFilterContainer;
