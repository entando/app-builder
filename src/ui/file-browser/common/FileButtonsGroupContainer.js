import { connect } from 'react-redux';

import { getPathInfo } from 'state/file-browser/selectors';
import FileButtonsGroup from 'ui/file-browser/common/FileButtonsGroup';

export const mapStateToProps = state => (
  {
    pathInfo: getPathInfo(state),
  }
);

export default connect(mapStateToProps, null)(FileButtonsGroup);
