import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteFragment } from 'state/fragments/actions';
import DeleteFragmentModal from 'ui/fragments/list/DeleteFragmentModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (fragmentCode) => {
    dispatch(sendDeleteFragment(fragmentCode));
    dispatch(setVisibleModal(''));
  },
});

const DeleteFragmentModalContainer =
connect(mapStateToProps, mapDispatchToProps)(DeleteFragmentModal);

export default DeleteFragmentModalContainer;
