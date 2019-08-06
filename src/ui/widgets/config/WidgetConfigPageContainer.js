import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import WidgetConfigPage from 'ui/widgets/config/WidgetConfigPage';

import { getWidgetConfigFrameName } from 'state/widget-config/selectors';
import { updateConfiguredPageWidget, initWidgetConfigPage } from 'state/widget-config/actions';
import { getSelectedWidgetConfig } from 'state/widgets/selectors';


export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onDidMount: () => dispatch(initWidgetConfigPage(params.pageCode, params.widgetCode)),
  onSubmit: (widgetConfig) => {
    dispatch(updateConfiguredPageWidget(widgetConfig, params));
  },
});

export const mapStateToProps = (state, { match: { params } }) => ({
  widgetId: params.widgetCode,
  widgetConfig: getSelectedWidgetConfig(state),
  // TODO: parse/cast integers in router package
  framePos: parseInt(params.framePos, 10),
  pageCode: params.pageCode,
  frameName: getWidgetConfigFrameName(params.framePos)(state),
});


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(WidgetConfigPage));
