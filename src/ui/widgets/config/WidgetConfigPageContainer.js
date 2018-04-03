import { connect } from 'react-redux';
import { getParams } from 'frontend-common-components';

import WidgetConfigPage from 'ui/widgets/config/WidgetConfigPage';

import { getWidgetConfigFrameName } from 'state/widget-config/selectors';
import { updateConfiguredPageWidget, initWidgetConfigPage } from 'state/widget-config/actions';


export const mapDispatchToProps = dispatch => ({
  onWillMount: () => dispatch(initWidgetConfigPage()),
  onSubmit: (widgetConfig) => {
    dispatch(updateConfiguredPageWidget(widgetConfig));
  },
});

export const mapStateToProps = state => ({
  widgetId: getParams(state).widgetCode,
  framePos: parseInt(getParams(state).framePos, 10),
  pageCode: getParams(state).pageCode,
  frameName: getWidgetConfigFrameName(state),
});


const WidgetConfigPageContainer = connect(mapStateToProps, mapDispatchToProps)(WidgetConfigPage);
export default WidgetConfigPageContainer;
