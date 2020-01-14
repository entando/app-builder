import React from 'react';
import PropTypes from 'prop-types';
import { isString } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { ToastNotificationList, TimedToastNotification } from 'patternfly-react';

const toMessageDescriptor = message => (
  isString(message) ? message : <FormattedMessage {...message} />
);

const Toasts = ({ toasts, onDismiss }) => {
  const notifications = Object.keys(toasts).reverse().map(key => (
    <TimedToastNotification
      key={key}
      type={toasts[key].type}
      onDismiss={() => onDismiss(key)}
      timerdelay={5000}
    >
      {toMessageDescriptor(toasts[key].message)}
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
