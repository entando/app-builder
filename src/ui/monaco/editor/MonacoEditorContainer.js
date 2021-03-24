import { connect } from 'react-redux';

import MonacoEditor from 'ui/monaco/editor/MonacoEditor';
import { getOpenedFile, getOpenedFilePath } from 'state/next-pages/selectors';
import { getLoading } from 'state/loading/selectors';
import {
  changeOpenedFileContent, discardOpenedFileUnsavedContent,
  fetchNextFile, resetOpenedFileContent, saveOpenedFileContent,
} from 'state/next-pages/actions';
import { content } from 'state/page-config/reducer';

export const mapStateToProps = state => ({
  loading: getLoading(state).openNextFile,
  path: getOpenedFilePath(state),
  file: getOpenedFile(state),
});

export const mapDispatchToProps = dispatch => ({
  onFetchFile: (path) => {
    dispatch(fetchNextFile(path));
  },
  onContentChange: (changedContent) => {
    dispatch(changeOpenedFileContent(changedContent));
  },
  onSaveContent: (savingContent) => {
    dispatch(saveOpenedFileContent(savingContent));
  },
  discardContent: () => {
    dispatch(discardOpenedFileUnsavedContent(content));
  },
  resetContent: () => {
    dispatch(resetOpenedFileContent());
  },
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(MonacoEditor);
