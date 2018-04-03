import { connect } from 'react-redux';

import WidgetFrame from 'ui/pages/config/WidgetFrame';
import frameDropTarget from 'ui/pages/config/frameDropTarget';
import { configOrUpdatePageWidget } from 'state/page-config/actions';

export const mapDispatchToProps = dispatch => ({
  onDrop: ({ sourceWidgetId, sourceFrameId, targetFrameId }) => {
    dispatch(configOrUpdatePageWidget(sourceWidgetId, sourceFrameId, targetFrameId));
  },
});

export default connect(null, mapDispatchToProps)(frameDropTarget(WidgetFrame));
