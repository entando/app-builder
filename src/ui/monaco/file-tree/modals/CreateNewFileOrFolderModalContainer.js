import { connect } from 'react-redux';
import { getLoading } from 'state/loading/selectors';
import { setVisibleModal } from 'state/modal/actions';
import { getInfo } from 'state/modal/selectors';
import { sendCreateNewFile } from 'state/next-pages/actions';

import CreateNewFileOrFolderModal from 'ui/monaco/file-tree/modals/CreateNewFileOrFolderModal';

export const mapStateToProps = state => ({
  info: getInfo(state),
  loading: getLoading(state).createNewNextFile,
});

export const mapDispatchToProps = dispatch => ({
  onConfirmCreate: (path) => {
    dispatch(setVisibleModal(''));
    dispatch(sendCreateNewFile(path));
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(CreateNewFileOrFolderModal);
