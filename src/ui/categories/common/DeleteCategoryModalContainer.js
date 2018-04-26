import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteCategory } from 'state/categories/actions';
import DeleteCategoryModal from 'ui/categories/common/DeleteCategoryModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (categoryCode) => {
    dispatch(sendDeleteCategory(categoryCode));
    dispatch(setVisibleModal(''));
  },
});

const DeleteCategoryModalContainer =
  connect(mapStateToProps, mapDispatchToProps)(DeleteCategoryModal);

export default DeleteCategoryModalContainer;
