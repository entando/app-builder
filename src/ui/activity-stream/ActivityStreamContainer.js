import React from 'react';
import { connect } from 'react-redux';
import { ActivityStream, Notification } from 'frontend-common-components';


import { toggleNotificationDrawer, getJsonNotifications } from 'state/activity-stream/actions';
import { getHidden } from 'state/activity-stream/selectors';


const createNotification = item => (
  React.createElement(
    Notification,
    {
      key: item.id,
      username: item.author.username,
      notification: item.notification.en,
      targetName: item.target.name,
      onClickUsername: () => {},
      onClickTargetName: () => {},
      onClickLike: () => {},
      modificationDate: new Date(item.modificationDate),
    },
  )
);
const createNotificationStructure = () => {
  getJsonNotifications().then((json) => {
    const data = json.payload.notifications;
    if (Array.isArray(data)) {
      const result = data.map(item => createNotification(item));
      return result;
    }
    return createNotification(data);
  });
};

export const mapStateToProps = state => (
  {
    hidden: getHidden(state),
    children: createNotificationStructure(),
  });

export const mapDispatchToProps = dispatch => ({
  closeDrawer: () => {
    dispatch(toggleNotificationDrawer());
  },
});

const ActivityStreamContainer = connect(mapStateToProps, mapDispatchToProps)(ActivityStream);

export default ActivityStreamContainer;
