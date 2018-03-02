
import { connect } from 'react-redux';

// import the Component to be connected
import EditWidgetPage from 'ui/widgets/edit/EditWidgetPage';
import { fetchWidget } from 'state/widgets/actions';
import { getParams } from 'frontend-common-components';
import { formValueSelector } from 'redux-form';

export const mapStateToProps = state => (
  {
    widgetCode: getParams(state).widgetCode,
    widgetName: formValueSelector('widget')(state, 'name'),
  });

  // map the props
export const mapDispatchToProps = dispatch => ({
  onWillMount: (props) => {
    dispatch(fetchWidget(props.widgetCode));
  },
});

// connect the component
const EditWidgetPageContainer = connect(mapStateToProps, mapDispatchToProps)(EditWidgetPage);

// export connected component (Container)
export default EditWidgetPageContainer;
