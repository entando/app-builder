import { connect } from 'react-redux';
import CategoryTree from 'ui/categories/list/CategoryTree';
import { handleExpandCategory, fetchCategoryTree } from 'state/categories/actions';
import { getCategoryTree } from 'state/categories/selectors';
import { getLoading } from 'state/loading/selectors';

export const mapStateToProps = state => ({
  categories: getCategoryTree(state),
  loading: getLoading(state).categories,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchCategoryTree());
    dispatch(handleExpandCategory());
  },
  onExpandCategory: categoryCode =>
    dispatch(handleExpandCategory(categoryCode)),
});

const CategoryTreeContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryTree);

export default CategoryTreeContainer;
