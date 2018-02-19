import { connect } from 'react-redux';
import NotificationList from 'ui/activity-stream/NotificationList';
import { getNotifications } from 'state/activity-stream/selectors';
import { getRouteUserName } from 'state/activity-stream/actions';

export const mapStateToProps = state => ({
  notifications: getNotifications(state),
});

export const mapDispatchToProps = dispatch => ({
  onClickUsername: (id) => {
    dispatch(getRouteUserName(id));
  },
  onClickTargetName: (id) => { console.log('onClickTargetName: ', id); },
  onClickLike: (id) => { console.log('onClickLike: ', id); },
});

const NotificationListContainer = connect(mapStateToProps, mapDispatchToProps)(NotificationList);

export default NotificationListContainer;
