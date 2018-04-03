import { connect } from 'react-redux';

import frameDragSource from 'ui/pages/config/frameDragSource';
import frameDropTarget from 'ui/pages/config/frameDropTarget';
import WidgetFrame from 'ui/pages/config/WidgetFrame';
import { updatePageWidget, removePageWidget, editWidgetConfig } from 'state/page-config/actions';


export const mapDispatchToProps = dispatch => ({
  onDrop: ({ sourceWidgetId, sourceFrameId, targetFrameId }) => {
    dispatch(updatePageWidget(sourceWidgetId, sourceFrameId, targetFrameId));
  },
  onClickDelete: frameId => dispatch(removePageWidget(frameId)),
  onClickSettings: frameId => dispatch(editWidgetConfig(frameId)),
});


export default connect(null, mapDispatchToProps)(frameDropTarget(frameDragSource(WidgetFrame)));
