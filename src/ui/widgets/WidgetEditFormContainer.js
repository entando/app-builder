
import { connect } from 'react-redux';

// import the Component to be connected
import WidgetForm from 'ui/widgets/WidgetForm';

import { fetchGroups } from 'state/groups/actions';
import { getGroups } from 'state/groups/selectors';

const EDIT_MODE = 'edit';

export const mapStateToProps = state => (
  {
    mode: EDIT_MODE,
    groups: getGroups(state),
  });

// map the props
export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    dispatch(fetchGroups());
  },
  onSubmit: () => {},
});

// connect the component
const WidgetEditFormContainer = connect(mapStateToProps, mapDispatchToProps)(WidgetForm);

// export connected component (Container)
export default WidgetEditFormContainer;
