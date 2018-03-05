import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';

const EmptyData = ({ messageId }) => (
  <Alert type="info">
    <strong>
      <FormattedMessage id={messageId} />
    </strong>
  </Alert>);

EmptyData.propTypes = {
  messageId: PropTypes.string.isRequired,
};

export default EmptyData;
