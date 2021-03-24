import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import DeleteFileOrFolderModal from 'ui/monaco/file-tree/modals/DeleteFileOrFolderModal';
import { sendDelete } from 'state/next-pages/actions';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (path) => {
    dispatch(sendDelete(path));
    dispatch(setVisibleModal(''));
  },
});

const DeleteFileOrFolderModalContainer =
 connect(mapStateToProps, mapDispatchToProps)(DeleteFileOrFolderModal);

export default DeleteFileOrFolderModalContainer;
