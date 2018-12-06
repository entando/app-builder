import { connect } from 'react-redux';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';

import { getDECategoryList } from 'state/digital-exchange/categories/selectors';
import { fetchDEComponents } from 'state/digital-exchange/components/actions';
import { fetchDECategories } from 'state/digital-exchange/categories/actions';
import CategoryFilter from 'ui/digital-exchange/CategoryFilter';

const FIELD_OPERATORS = {
  category: FILTER_OPERATORS.LIKE,
};

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => (dispatch(fetchDECategories())),
  onChange: (eventOrValue) => {
    const { categories } = eventOrValue;
    if (categories) {
      const filters = {
        formValues: { category: categories },
        operators: FIELD_OPERATORS,
      };

      dispatch(fetchDEComponents({ page: 1, pageSize: 10 }, convertToQueryString(filters)));
    }
  },
});

export const mapStateToProps = state => (
  { digitalExchangeCategories: getDECategoryList(state) }
);

const CategoryFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryFilter);

export default CategoryFilterContainer;
