import React from 'react';
import { PropTypes } from 'prop-types';

/**
 * Sample stateless component
 */
const HelloWorldMessage = ({ message }) =>
  <span className="HelloWorldMessage">{message}</span>;

HelloWorldMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default HelloWorldMessage;
