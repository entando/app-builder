
import { connect } from 'react-redux';

// import the Component to be connected
import EditWidgetPage from 'ui/widgets/edit/EditWidgetPage';
import { formValueSelector } from 'redux-form';
import withPermissions from 'ui/auth/withPermissions';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';

export const mapStateToProps = state => (
  {
    widgetName: formValueSelector('widget')(state, 'name'),
  });

// connect the component
const EditWidgetPageContainer = connect(mapStateToProps, null)(EditWidgetPage);

// export connected component (Container)
export default withPermissions(SUPERUSER_PERMISSION)(EditWidgetPageContainer);
