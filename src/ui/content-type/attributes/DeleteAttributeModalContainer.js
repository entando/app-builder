import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendDeleteAttributeFromContentType } from 'state/content-type/actions';
import DeleteAttributeModal from 'ui/content-type/attributes/DeleteAttributeModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (code) => {
    dispatch(sendDeleteAttributeFromContentType(code));
    dispatch(setVisibleModal(''));
  },
});

const DeleteAttributeModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteAttributeModal);

export default DeleteAttributeModalContainer;
