
import { connect } from 'react-redux';

// import the Component to be connected
import PageSettings from 'ui/settings/PageSettings';

import { fetchGroups } from 'state/groups/actions';
import { getGroups } from 'state/groups/selectors';


export const mapStateToProps = state => (
  {
    // mode: EDIT_MODE,
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
const WidgetEditFormContainer = connect(mapStateToProps, mapDispatchToProps)(PageSettings);

// export connected component (Container)
export default WidgetEditFormContainer;
