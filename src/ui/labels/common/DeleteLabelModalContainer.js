import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { removeLabel } from 'state/labels/actions';
import DeleteLabelModal from 'ui/labels/common/DeleteLabelModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (labelCode) => {
    dispatch(removeLabel(labelCode));
    dispatch(setVisibleModal(''));
  },
});

const DeleteLabelModalContainer =
  connect(mapStateToProps, mapDispatchToProps)(DeleteLabelModal);

export default DeleteLabelModalContainer;
