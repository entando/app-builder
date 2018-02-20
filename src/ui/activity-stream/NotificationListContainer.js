import { connect } from 'react-redux';
import NotificationList from 'ui/activity-stream/NotificationList';
import { getNotifications } from 'state/activity-stream/selectors';
import { getRouteUserName, getRouteTargetName } from 'state/activity-stream/actions';
import { getLocale } from 'state/locale/selectors';

export const mapStateToProps = state => ({
  notifications: getNotifications(state),
  locale: getLocale(state),
});

export const mapDispatchToProps = dispatch => ({
  onClickUsername: (id) => {
    dispatch(getRouteUserName(id));
  },
  onClickTargetName: (id) => {
    dispatch(getRouteTargetName(id));
  },
  onClickLike: id => (id),
});

const NotificationListContainer = connect(mapStateToProps, mapDispatchToProps)(NotificationList);

export default NotificationListContainer;
