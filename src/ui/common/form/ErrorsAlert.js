import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Alert } from 'patternfly-react';

const ErrorsAlert = ({ messages, onDismiss }) => (
  messages.length ?
    (
      <Alert onDismiss={onDismiss}>
        <strong>
          <FormattedMessage id="app.errors" />
        </strong>
        <ul>
          {messages.map(msg => <li key={msg}>{msg}</li>)}
        </ul>
      </Alert>
    ) :
    null
);

ErrorsAlert.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default ErrorsAlert;
