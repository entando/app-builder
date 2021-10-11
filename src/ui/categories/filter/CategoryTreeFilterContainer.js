import { connect } from 'react-redux';
import CategoryTreeFilter from 'ui/categories/filter/CategoryTreeFilter';

import { fetchCategoryTreeAll } from 'state/categories/actions';
import { setAssetCategoryFilter } from 'state/assets/actions';
import { setContentCategoryFilter, setJoinContentCategory } from 'state/contents/actions';
import { getFilteringCategories, getJoiningCategories } from 'state/contents/selectors';
import {
  getFilteringCategories as getAssetsFilteringCategories,
  getPaginationOptions,
} from 'state/assets/selectors';
import { getCategoryTree } from 'state/categories/selectors';

const toggleCategoryInArray = (category, categories) => {
  if (categories.filter(cat => cat.code === category.code).length === 0) {
    return [...categories, category];
  }
  return categories.filter(c => c.code !== category.code);
};
export const mapStateToProps = state => ({
  categories: getCategoryTree(state),
  paginationOptions: getPaginationOptions(state),
});

export const mapDispatchToProps = (dispatch, getState) => ({
  onDidMount: () => dispatch(fetchCategoryTreeAll()),
  onCheckCategory: (category, filterSubject) => {
    const state = getState();
    if (filterSubject === 'content') {
      const filteringCategories = getFilteringCategories(state);
      dispatch(setContentCategoryFilter(toggleCategoryInArray(category, filteringCategories)));
    } else if (filterSubject === 'joinContentCategory') {
      const joiningCategories = getJoiningCategories(state);
      dispatch(setJoinContentCategory(toggleCategoryInArray(category, joiningCategories)));
    } else {
      const filteringCategories = getAssetsFilteringCategories(state);
      dispatch(setAssetCategoryFilter(toggleCategoryInArray(category, filteringCategories)));
    }
  },
});

const CategoryTreeFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryTreeFilter);

export default CategoryTreeFilterContainer;
