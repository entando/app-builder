import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { sendDeleteFile } from 'state/file-browser/actions';
import DeleteFileModal from 'ui/file-browser/common/DeleteFileModal';
import { getInfo } from 'state/modal/selectors';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (values) => {
    dispatch(sendDeleteFile(values));
    dispatch(setVisibleModal(''));
  },
});

const DeleteFileModalContainer =
  connect(mapStateToProps, mapDispatchToProps)(DeleteFileModal);

export default DeleteFileModalContainer;
