import { connect } from 'react-redux';
import { convertToQueryString, FILTER_OPERATORS } from '@entando/utils';

import { getDECategoryList } from 'state/digital-exchange/categories/selectors';
import { fetchDEComponents, setDEFilters } from 'state/digital-exchange/components/actions';
import { fetchDECategories } from 'state/digital-exchange/categories/actions';
import CategoryTabs from 'ui/digital-exchange/CategoryTabs';

const FIELD_OPERATORS = {
  category: FILTER_OPERATORS.LIKE,
};

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => (dispatch(fetchDECategories())),
  onSelect: (category) => {
    const filters = {
      formValues: { category: category ? [category] : [] },
      operators: FIELD_OPERATORS,
    };
    dispatch(setDEFilters(filters));
    dispatch(fetchDEComponents({ page: 1, pageSize: 10 }, convertToQueryString(filters)));
  },
});

export const mapStateToProps = state => ({
  digitalExchangeCategories: getDECategoryList(state),
});

const CategoryTabsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryTabs);

export default CategoryTabsContainer;
