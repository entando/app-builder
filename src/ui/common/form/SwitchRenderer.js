import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'patternfly-react';

const SwitchRenderer = ({ input: { onChange, value } }) =>
  <Switch defaultValue={value} onChange={(el, val) => onChange(val)} />;


SwitchRenderer.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
};


export default SwitchRenderer;
