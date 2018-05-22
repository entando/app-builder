import React from 'react';
import PropTypes from 'prop-types';
import Notification from 'ui/activity-stream/Notification';


const NotificationList = ({
  notifications, onClickUsername, onClickTargetName, onClickLike,
  onSubmitComment, onClickDeleteComment,
}) => (
  notifications.map(item => (
    <Notification
      key={item.id}
      id={item.id}
      username={item.username}
      notification={item.actionName} // {item.notification[locale]}
      targetName={item.parameters || ''}
      comments={item.comments}
      onClickUsername={onClickUsername}
      onClickTargetName={onClickTargetName}
      onClickLike={onClickLike}
      onSubmitComment={onSubmitComment}
      onClickDeleteComment={onClickDeleteComment}
      modificationDate={new Date(item.updatedAt)}
    />

  ))
);

NotificationList.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({
    notification: PropTypes.string,
    targetName: PropTypes.string,
    modificationDate: PropTypes.date,
    onClickTargetName: PropTypes.func,
    onClickUsername: PropTypes.func,
    onClickLike: PropTypes.func,
  })).isRequired,
};


NotificationList.defaultProps = {
  notifications: [],
  onClickUsername: () => {},
  onClickTargetName: () => {},
  onClickLike: () => {},
};
export default NotificationList;
