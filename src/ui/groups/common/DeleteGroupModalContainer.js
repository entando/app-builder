import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import DeleteGroupModal from 'ui/groups/common/DeleteGroupModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: () => {
    // insert delete action
    dispatch(setVisibleModal(''));
  },
});

const DeleteGroupModalContainer = connect(mapStateToProps, mapDispatchToProps)(DeleteGroupModal);

export default DeleteGroupModalContainer;
