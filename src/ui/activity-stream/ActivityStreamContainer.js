import { connect } from 'react-redux';
import { ActivityStream } from 'frontend-common-components';


import { toggleNotificationDrawer, getNotifications } from 'state/activity-stream/actions';
import { getHidden } from 'state/activity-stream/selectors';

export const mapStateToProps = state => (
  {
    hidden: getHidden(state),
    notifications: getNotifications(),
  });

export const mapDispatchToProps = dispatch => ({
  closeDrawer: () => {
    dispatch(toggleNotificationDrawer());
  },
});

const ActivityStreamContainer = connect(mapStateToProps, mapDispatchToProps)(ActivityStream);

export default ActivityStreamContainer;
