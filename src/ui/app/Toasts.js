import React from 'react';
import PropTypes from 'prop-types';
import { ToastNotificationList, TimedToastNotification } from 'patternfly-react';
import IntlMessage from 'ui/common/IntlMessage';

const Toasts = ({ toasts, onDismiss }) => {
  const notifications = Object.keys(toasts).reverse().map(key => (
    <TimedToastNotification
      key={key}
      type={toasts[key].type}
      onDismiss={() => onDismiss(key)}
      timerdelay={5000}
    >
      <IntlMessage message={toasts[key].message} />
    </TimedToastNotification>
  ));

  return (
    <ToastNotificationList>
      {notifications}
    </ToastNotificationList>
  );
};

Toasts.propTypes = {
  toasts: PropTypes.shape({}),
  onDismiss: PropTypes.func.isRequired,
};

Toasts.defaultProps = {
  toasts: {},
};

export default Toasts;
