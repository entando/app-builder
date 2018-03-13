import { connect } from 'react-redux';

import EmptyFrame from 'ui/pages/config/EmptyFrame';
import frameDropTarget from 'ui/pages/config/frameDropTarget';
import { updatePageWidget } from 'state/page-config/actions';

export const mapDispatchToProps = dispatch => ({
  onDrop: ({ sourceWidget, sourceFrame, targetFrame }) =>
    dispatch(updatePageWidget(sourceWidget, targetFrame.pos, sourceFrame.pos)),
});

export default connect(null, mapDispatchToProps)(frameDropTarget(EmptyFrame));
