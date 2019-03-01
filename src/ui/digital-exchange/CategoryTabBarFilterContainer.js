import { connect } from 'react-redux';
import { getDECategoryList, getSelectedDECategory } from 'state/digital-exchange/categories/selectors';
import { navigateDECategory } from 'state/digital-exchange/actions';
import { fetchDECategories } from 'state/digital-exchange/categories/actions';
import { ALL_CATEGORIES_CATEGORY } from 'state/digital-exchange/categories/const';
import TabBarFilter from 'ui/digital-exchange/common/TabBarFilter';
import { formattedText } from '@entando/utils';


export const mapDispatchToProps = dispatch => ({
  onWillMount: () => (dispatch(fetchDECategories())),
  onSelect: (filter) => {
    dispatch(navigateDECategory(filter));
  },
});

export const mapStateToProps = (state) => {
  const filterTabs = [
    ALL_CATEGORIES_CATEGORY,
    ...getDECategoryList(state),
  ].map(filterTab => ({
    label: formattedText(`digitalExchange.filterTabs.${filterTab}`, filterTab),
    value: filterTab,
  }));

  return {
    filterTabs,
    selectedFilterTab: getSelectedDECategory(state) || ALL_CATEGORIES_CATEGORY,
    attributes: {
      componentClass: 'CategoryTabs',
      componentId: 'de-category-tabs',
    },
  };
};

const CategoryTabBarFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabBarFilter);

export default CategoryTabBarFilterContainer;
