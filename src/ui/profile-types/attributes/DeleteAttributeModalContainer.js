import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteAttributeFromProfileType } from 'state/profile-types/actions';
import DeleteAttributeModal from 'ui/profile-types/attributes/DeleteAttributeModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (code) => {
    dispatch(sendDeleteAttributeFromProfileType(code));
    dispatch(setVisibleModal(''));
  },
});

const DeleteAttributeModalContainer =
  connect(mapStateToProps, mapDispatchToProps)(DeleteAttributeModal);

export default DeleteAttributeModalContainer;
