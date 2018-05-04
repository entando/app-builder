import { connect } from 'react-redux';

import { fetchFileList } from 'state/file-browser/actions';
import { getFileList } from 'state/file-browser/selectors';
import { getLoading } from 'state/loading/selectors';
import FilesListTable from 'ui/file-browser/list/FilesListTable';

export const mapStateToProps = state => (
  {
    files: getFileList(state),
    loading: getLoading(state).files,
  }
);

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchFileList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilesListTable);
