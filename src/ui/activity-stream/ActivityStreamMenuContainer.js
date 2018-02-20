import { connect } from 'react-redux';
import { ActivityStreamMenu } from 'frontend-common-components';

import { toggleNotificationList } from 'state/activity-stream/actions';

export const mapDispatchToProps = dispatch => ({
  onClickToggle: () => {
    dispatch(toggleNotificationList());
  },
});

const ActivityStreamMenuContainer = connect(null, mapDispatchToProps)(ActivityStreamMenu);

export default ActivityStreamMenuContainer;
