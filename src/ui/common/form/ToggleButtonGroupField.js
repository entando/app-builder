import React from 'react';
import PropTypes from 'prop-types';
import { ToggleButtonGroup } from 'react-bootstrap';

const ToggleButtonGroupField = ({ input, children }) => (
  <ToggleButtonGroup {...input} value={input.value} type="radio">
    {children}
  </ToggleButtonGroup>
);

ToggleButtonGroupField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.any,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default ToggleButtonGroupField;
