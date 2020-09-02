import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { routeConverter } from '@entando/utils';

import frameDragSource from 'ui/pages/config/frameDragSource';
import frameDropTarget from 'ui/pages/config/frameDropTarget';
import WidgetFrame from 'ui/pages/config/WidgetFrame';
import { configOrUpdatePageWidget, removePageWidget, editWidgetConfig } from 'state/page-config/actions';
import { ROUTE_CLONE_WIDGET } from 'app-init/router';


export const mapDispatchToProps = (dispatch, { match: { params }, history }) => ({
  onDrop: ({
    sourceWidgetId, sourceFrameId, targetFrameId,
  }) => {
    dispatch(configOrUpdatePageWidget(
      sourceWidgetId,
      sourceFrameId,
      targetFrameId,
      params.pageCode,
    ));
  },
  onClickDelete: frameId => dispatch(removePageWidget(frameId, params.pageCode)),
  onClickSettings: frameId => dispatch(editWidgetConfig(frameId, params.pageCode)),
  onClickSaveAs: ({
    widgetId, frameId, widgetAction,
  }) => {
    history.push(routeConverter(ROUTE_CLONE_WIDGET, {
      parentCode: widgetId,
      frameId,
      pageCode: params.pageCode,
      widgetAction,
    }));
  },
});


export default withRouter(connect(
  null,
  mapDispatchToProps,
)(frameDropTarget(frameDragSource(WidgetFrame))));
