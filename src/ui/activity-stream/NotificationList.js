import React from 'react';
import PropTypes from 'prop-types';
import { Notification } from 'frontend-common-components';


const NotificationList = ({
  notifications, onClickUsername, onClickTargetName, onClickLike, locale,
}) => (
  notifications.map(item => (
    <Notification
      key={item.id}
      id={item.id}
      username={item.author.username}
      notification={item.notification[locale]}
      targetName={item.target.name}
      onClickUsername={onClickUsername}
      onClickTargetName={onClickTargetName}
      onClickLike={onClickLike}
      modificationDate={new Date(item.modificationDate)}
    />

  )));

NotificationList.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
    notification: PropTypes.object.isRequired,
    target: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    modificationDate: PropTypes.string.isRequired,
    onClickTargetName: PropTypes.func,
    onClickUsername: PropTypes.func,
    onClickLike: PropTypes.func,
    locale: PropTypes.string,
  })).isRequired,
};


NotificationList.defaultProps = {
  notifications: [],
  onClickUsername: () => {},
  onClickTargetName: () => {},
  onClickLike: () => {},
  locale: 'en',
};
export default NotificationList;
