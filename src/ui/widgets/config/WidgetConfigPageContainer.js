import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import WidgetConfigPage from 'ui/widgets/config/WidgetConfigPage';

import { makeGetWidgetConfigFrameName } from 'state/widget-config/selectors';
import { updateConfiguredPageWidget, initWidgetConfigPage } from 'state/widget-config/actions';
import { getWidgetFormConfig } from 'state/widgets/selectors';


export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onDidMount: () => {
    const { pageCode, widgetCode, framePos } = params;
    dispatch(initWidgetConfigPage(pageCode, widgetCode, parseInt(framePos, 10)));
  },
  onSubmit: (widgetConfig) => {
    dispatch(updateConfiguredPageWidget(widgetConfig, params));
  },
});

export const mapStateToProps = (state, { match: { params } }) => ({
  widgetCode: params.widgetCode,
  widgetConfig: getWidgetFormConfig(state),
  // TODO: parse/cast integers in router package
  framePos: parseInt(params.framePos, 10),
  pageCode: params.pageCode,
  frameName: makeGetWidgetConfigFrameName(params.framePos)(state),
});


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(WidgetConfigPage));
