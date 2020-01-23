import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'patternfly-react';
import IntlMessage from 'ui/common/IntlMessage';

const ErrorsAlert = ({ messages, onDismiss }) => (
  messages.length ? (
    <div className="ErrorsAlert">
      <Alert color="danger" toggle={onDismiss}>
        {messages.length === 1 ? (
          <Fragment>
            <span className="icon fa fa-exclamation-circle" />
            <span className="ErrorsAlert__message">
              <IntlMessage message={messages[0]} />
            </span>
          </Fragment>
        ) : (
          <Fragment>
            <ul>
              {messages.map(msg => (
                <li key={msg}>
                  <IntlMessage message={msg} />
                </li>
              ))}
            </ul>
          </Fragment>
        )}
      </Alert>
    </div>
  ) : null
);

ErrorsAlert.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default ErrorsAlert;
