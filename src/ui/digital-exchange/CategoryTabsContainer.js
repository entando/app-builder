import { connect } from 'react-redux';
import { getDECategoryList, getSelectedDECategory } from 'state/digital-exchange/categories/selectors';
import { navigateDECategory } from 'state/digital-exchange/actions';
import { fetchDECategories } from 'state/digital-exchange/categories/actions';
import { ALL_CATEGORIES_CATEGORY } from 'state/digital-exchange/categories/const';
import CategoryTabs from 'ui/digital-exchange/CategoryTabs';

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => (dispatch(fetchDECategories())),
  onSelect: (category) => {
    dispatch(navigateDECategory(category));
  },
});

export const mapStateToProps = state => ({
  digitalExchangeCategories: [
    ALL_CATEGORIES_CATEGORY,
    ...getDECategoryList(state),
  ],
  selectedDECategory: getSelectedDECategory(state) || ALL_CATEGORIES_CATEGORY,
});

const CategoryTabsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryTabs);

export default CategoryTabsContainer;
