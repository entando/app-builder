import { connect } from 'react-redux';
import { ActivityStreamMenu } from 'frontend-common-components';

import { closeNotificationDrawer } from 'state/activity-stream/actions';

export const mapDispatchToProps = dispatch => ({
  onClickToggle: () => {
    dispatch(closeNotificationDrawer());
  },
});

const ActivityStreamMenuContainer = connect(null, mapDispatchToProps)(ActivityStreamMenu);

export default ActivityStreamMenuContainer;
