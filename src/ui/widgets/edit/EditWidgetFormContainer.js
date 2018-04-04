
import { connect } from 'react-redux';

// import the Component to be connected
import WidgetForm from 'ui/widgets/common/WidgetForm';

import { fetchGroups } from 'state/groups/actions';
import { getGroupsList } from 'state/groups/selectors';

const EDIT_MODE = 'edit';

export const mapStateToProps = state => (
  {
    mode: EDIT_MODE,
    groups: getGroupsList(state),
  });

// map the props
export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchGroups());
  },
  onSubmit: () => {},
});

// connect the component
const EditWidgetFormContainer = connect(mapStateToProps, mapDispatchToProps)(WidgetForm);

// export connected component (Container)
export default EditWidgetFormContainer;
