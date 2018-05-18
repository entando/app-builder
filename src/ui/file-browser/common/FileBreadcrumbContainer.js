import { connect } from 'react-redux';
import { fetchFileList } from 'state/file-browser/actions';
import { getPathInfo } from 'state/file-browser/selectors';
import FileBreadcrumb from 'ui/file-browser/common/FileBreadcrumb';

export const mapStateToProps = state => (
  {
    pathInfo: getPathInfo(state),
  }
);

export const mapDispatchToProps = dispatch => ({
  updateFileBrowser: (protectedFolder = '', path = '') => {
    dispatch(fetchFileList(protectedFolder, path));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FileBreadcrumb);
