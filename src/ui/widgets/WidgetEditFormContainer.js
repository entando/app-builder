
import { connect } from 'react-redux';

// import the Component to be connected
import WidgetForm from 'ui/widgets/WidgetForm';

import { fetchWidget } from 'state/widget-form/actions';
import { getParams } from 'frontend-common-components';

const EDIT_MODE = 'edit';

export const mapStateToProps = state => (
  {
    mode: EDIT_MODE,
    widgetCode: getParams(state).widgetCode,
  });

// map the props
export const mapDispatchToProps = dispatch => ({
  onWillMount: (props) => {
    dispatch(fetchWidget(props.widgetCode));
  },
  onSubmit: () => {},
  handleSubmit: () => {},
});

// connect the component
const WidgetEditFormContainer = connect(mapStateToProps, mapDispatchToProps)(WidgetForm);

// export connected component (Container)
export default WidgetEditFormContainer;
