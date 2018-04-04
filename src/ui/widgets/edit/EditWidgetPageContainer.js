
import { connect } from 'react-redux';

// import the Component to be connected
import EditWidgetPage from 'ui/widgets/edit/EditWidgetPage';
import { formValueSelector } from 'redux-form';

export const mapStateToProps = state => (
  {
    widgetName: formValueSelector('widget')(state, 'name'),
  });

// connect the component
const EditWidgetPageContainer = connect(mapStateToProps, null)(EditWidgetPage);

// export connected component (Container)
export default EditWidgetPageContainer;
