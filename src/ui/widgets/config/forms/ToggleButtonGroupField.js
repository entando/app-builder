import React from 'react';
import PropTypes from 'prop-types';
import { ToggleButtonGroup } from 'react-bootstrap';

const ToggleButtonGroupField = props => (
  <ToggleButtonGroup type="radio" name={props.field.name} {...props.field} value={props.field.value} onChange={props.field.onChange} >
    {props.children}
  </ToggleButtonGroup>
);
ToggleButtonGroupField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
  }).isRequired,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default ToggleButtonGroupField;
