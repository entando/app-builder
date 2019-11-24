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
  const { pageCode, framePos } = params;

  const getPageWidgetConfig = (st) => { // TODO refactor to a selector
    const pageConfig = st.pageConfig.configMap[pageCode];
    return pageConfig ? pageConfig[parseInt(framePos, 10)].config : null;
  };

  return {
    widgetCode: params.widgetCode,
    widgetConfig: getPageWidgetConfig(state),
    framePos: parseInt(params.framePos, 10),
    pageCode: params.pageCode,
    frameName: makeGetWidgetConfigFrameName(params.framePos)(state),
  };
};


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(WidgetConfigPage));
