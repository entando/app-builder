import { connect } from 'react-redux';
import NotificationList from 'ui/activity-stream/NotificationList';
import { getNotifications } from 'state/activity-stream/selectors';
import {
  getRouteUserName,
  getRouteTargetName,
  sendPostActivityStreamComment,
  sendDeleteActivityStreamComment,
  sendPostActivityStreamLike,
} from 'state/activity-stream/actions';

export const mapStateToProps = state => ({
  notifications: getNotifications(state),

});

export const mapDispatchToProps = dispatch => ({
  onClickUsername: id => dispatch(getRouteUserName(id)),
  onClickTargetName: id => dispatch(getRouteTargetName(id)),
  onClickLike: id => dispatch(sendPostActivityStreamLike(id)),
  onSubmitComment: (recordId, comment) =>
    dispatch(sendPostActivityStreamComment(recordId, comment)),
  onClickDeleteComment: (recordId, commentId) =>
    dispatch(sendDeleteActivityStreamComment(recordId, commentId)),
});

const NotificationListContainer = connect(mapStateToProps, mapDispatchToProps)(NotificationList);

export default NotificationListContainer;
