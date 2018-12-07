import { connect } from 'react-redux';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';
import { fetchDEComponents } from 'state/digital-exchange/components/actions';
import RatingFilter from './RatingFilter';

const FIELD_OPERATORS = {
  rating: FILTER_OPERATORS.GREATER_THAN,
};

export const mapDispatchToProps = dispatch => ({
  onSelect: (rating) => {
    if (rating) {
      const filters = {
        formValues: { rating },
        operators: FIELD_OPERATORS,
      };

      dispatch(fetchDEComponents({ page: 1, pageSize: 10 }, convertToQueryString(filters)));
    }
  },
});

const mapStateToProps = null;

const RatingFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RatingFilter);

export default RatingFilterContainer;
