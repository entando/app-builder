import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteGroup } from 'state/groups/actions';
import DeleteGroupModal from 'ui/groups/common/DeleteGroupModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (groupCode) => {
    dispatch(sendDeleteGroup(groupCode));
    dispatch(setVisibleModal(''));
  },
});

const DeleteGroupModalContainer = connect(mapStateToProps, mapDispatchToProps)(DeleteGroupModal);

export default DeleteGroupModalContainer;
