import React from 'react';
import { isString } from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const IntlMessage = ({ message }) => (
  isString(message) ? message : <FormattedMessage {...message} />
);

IntlMessage.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string, PropTypes.shape({}),
    PropTypes.func]).isRequired,
};

export default IntlMessage;
