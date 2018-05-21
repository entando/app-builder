import { connect } from 'react-redux';
import NotificationList from 'ui/activity-stream/NotificationList';
import { getNotifications } from 'state/activity-stream/selectors';
import { getRouteUserName, getRouteTargetName, sendPostActivityStreamComment } from 'state/activity-stream/actions';

export const mapStateToProps = state => ({
  notifications: getNotifications(state),

});

export const mapDispatchToProps = dispatch => ({
  onClickUsername: (id) => {
    dispatch(getRouteUserName(id));
  },
  onClickTargetName: (id) => {
    dispatch(getRouteTargetName(id));
  },
  onClickLike: id => (id),

  onSubmitComment: (comment, recordId) => {
    dispatch(sendPostActivityStreamComment(comment, recordId));
  },
});

const NotificationListContainer = connect(mapStateToProps, mapDispatchToProps)(NotificationList);

export default NotificationListContainer;
