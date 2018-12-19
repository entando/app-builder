import { connect } from 'react-redux';

import { getDECategoryList } from 'state/digital-exchange/categories/selectors';
import { showDEComponentsByCategory } from 'state/digital-exchange/components/actions';
import { fetchDECategories } from 'state/digital-exchange/categories/actions';
import CategoryTabs from 'ui/digital-exchange/CategoryTabs';

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => (dispatch(fetchDECategories())),
  onSelect: (category) => {
    dispatch(showDEComponentsByCategory(category));
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
