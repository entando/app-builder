import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import WidgetConfigPage from 'ui/widgets/config/WidgetConfigPage';

import { makeGetWidgetConfigFrameName } from 'state/widget-config/selectors';
import { updateConfiguredPageWidget, initWidgetConfigPage } from 'state/widget-config/actions';


export const mapDispatchToProps = (dispatch, { match: { params } }) => ({
  onDidMount: () => {
    const { pageCode, widgetCode, framePos } = params;
    dispatch(initWidgetConfigPage(pageCode, widgetCode, parseInt(framePos, 10)));
  },
  onSubmit: (widgetConfig) => {
    dispatch(updateConfiguredPageWidget(widgetConfig, params));
  },
});

export const mapStateToProps = (state, { match: { params } }) => {
  const { pageCode, framePos, widgetCode } = params;

  const getPageWidgetConfig = (st) => {
    const pageConfig = st.pageConfig.configMap[pageCode];
    const widgetConfig = pageConfig ? pageConfig[parseInt(framePos, 10)] : null;
    return widgetConfig ? widgetConfig.config : null;
  };

  return {
    widgetCode,
    widgetConfig: getPageWidgetConfig(state),
    framePos: parseInt(framePos, 10),
    pageCode,
    frameName: makeGetWidgetConfigFrameName(framePos)(state),
  };
};


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(WidgetConfigPage));
