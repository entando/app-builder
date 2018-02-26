
import { connect } from 'react-redux';

// import the Component to be connected
import WidgetEditPage from 'ui/app-pages/WidgetEditPage';
import { fetchWidget } from 'state/widget-form/actions';
import { getParams } from 'frontend-common-components';
import { getWidgetName } from 'state/widget-form/selectors';

export const mapStateToProps = state => (
  {
    widgetCode: getParams(state).widgetCode,
    widgetName: getWidgetName(state),
  });

  // map the props
export const mapDispatchToProps = dispatch => ({
  onWillMount: (props) => {
    dispatch(fetchWidget(props.widgetCode));
  },
});

// connect the component
const WidgetEditFormContainer = connect(mapStateToProps, mapDispatchToProps)(WidgetEditPage);

// export connected component (Container)
export default WidgetEditFormContainer;
