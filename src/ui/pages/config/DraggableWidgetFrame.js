import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import frameDragSource from 'ui/pages/config/frameDragSource';
import frameDropTarget from 'ui/pages/config/frameDropTarget';
import WidgetFrame from 'ui/pages/config/WidgetFrame';
import { updatePageWidget, removePageWidget, editWidgetConfig } from 'state/page-config/actions';


export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onDrop: ({ sourceWidgetId, sourceFrameId, targetFrameId }) => {
    dispatch(updatePageWidget(sourceWidgetId, sourceFrameId, targetFrameId, params.pageCode));
  },
  onClickDelete: frameId => dispatch(removePageWidget(frameId, params.pageCode)),
  onClickSettings: frameId => dispatch(editWidgetConfig(frameId, params.pageCode)),
});


export default withRouter(connect(
  null,
  mapDispatchToProps,
)(frameDropTarget(frameDragSource(WidgetFrame))));
