import { connect } from 'react-redux';
import CategoryTree from 'ui/categories/list/CategoryTree';
import { handleExpandCategory, fetchCategoryTree, initCategoryForm } from 'state/categories/actions';
import { getCategoryTree } from 'state/categories/selectors';
import { getLoading } from 'state/loading/selectors';
import { setVisibleModal, setInfo } from 'state/modal/actions';
import { MODAL_ID } from 'ui/categories/common/DeleteCategoryModal';

export const mapStateToProps = state => ({
  categories: getCategoryTree(state),
  loading: getLoading(state).categories,
});

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchCategoryTree());
  },
  onExpandCategory: categoryCode =>
    dispatch(handleExpandCategory(categoryCode)),
  onClickAdd: (code) => {
    dispatch(initCategoryForm({ parentCode: code }));
  },
  onClickDelete: (code) => {
    dispatch(setVisibleModal(MODAL_ID));
    dispatch(setInfo({ type: 'category', code }));
  },
});

const CategoryTreeContainer = connect(mapStateToProps, mapDispatchToProps)(CategoryTree);

export default CategoryTreeContainer;
