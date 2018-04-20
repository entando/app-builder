
import { connect } from 'react-redux';
import CategoryTreeSelector from 'ui/categories/common/CategoryTreeSelector';
import { handleExpandCategory } from 'state/categories/actions';
import { getCategoryTree } from 'state/categories/selectors';


export const mapStateToProps = state => ({
  categories: getCategoryTree(state),
});

export const mapDispatchToProps = dispatch => ({
  onExpandCategory: categoryCode =>
    dispatch(handleExpandCategory(categoryCode)),
});

const CategoryTreeSelectorContainer =
  connect(mapStateToProps, mapDispatchToProps)(CategoryTreeSelector);

export default CategoryTreeSelectorContainer;
