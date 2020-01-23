import React from 'react';
import { isString } from 'lodash';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const MessageDescriptor = ({ message }) => (
  isString(message) ? message : <FormattedMessage {...message} />
);

MessageDescriptor.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string, PropTypes.shape({}),
    PropTypes.func]).isRequired,
};

export default MessageDescriptor;
