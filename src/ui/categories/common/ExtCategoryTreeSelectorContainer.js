import { connect } from 'react-redux';
import ExtCategoryTreeSelector from 'ui/categories/common/ExtCategoryTreeSelector';

import {
  handleExpandCategory,
  onUnjoinCategory,
  onJoinCategory,
  handleExpandAll,
  handleCollapseAll,
} from 'state/categories/actions';
import { getCategoryTreeVisibleNodes, getJoinedCategoriesByCodes } from 'state/categories/selectors';

export const mapStateToProps = state => ({
  categories: getCategoryTreeVisibleNodes(state),
  getJoinedCategoriesByCodes: getJoinedCategoriesByCodes(state),
});

export const mapDispatchToProps = dispatch => ({
  onToggleExpandCategory: categoryCode => dispatch(handleExpandCategory(categoryCode)),
  onExpandCategory: (categoryCode, expanded) => (
    dispatch(handleExpandCategory(categoryCode, expanded))
  ),
  onJoinCategory: categoryCode => dispatch(onJoinCategory(categoryCode)),
  onUnjoinCategory: categoryCode => dispatch(onUnjoinCategory(categoryCode)),
  onExpandAll: () => dispatch(handleExpandAll()),
  onCollapseAll: () => dispatch(handleCollapseAll()),
});

const ExtCategoryTreeSelectorContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExtCategoryTreeSelector);

export default ExtCategoryTreeSelectorContainer;
