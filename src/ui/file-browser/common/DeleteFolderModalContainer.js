import { connect } from 'react-redux';
import { setVisibleModal } from 'state/modal/actions';
import { sendDeleteFolder } from 'state/file-browser/actions';
import DeleteFolderModal from 'ui/file-browser/common/DeleteFolderModal';
import { getInfo } from 'state/modal/selectors';

export const mapStateToProps = state => ({
  info: getInfo(state),
});

export const mapDispatchToProps = dispatch => ({
  onConfirmDelete: (file) => {
    dispatch(sendDeleteFolder({ protectedFolder: file.protectedFolder, path: file.path }));
    dispatch(setVisibleModal(''));
  },
});

const DeleteFolderModalContainer =
  connect(mapStateToProps, mapDispatchToProps)(DeleteFolderModal);

export default DeleteFolderModalContainer;
