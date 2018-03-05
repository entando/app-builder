import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'patternfly-react';

const SwitchRenderer = ({ input: { onChange, value } }) =>
  <Switch value={typeof value === 'string' ? false : value} onChange={(el, val) => onChange(val)} />;


SwitchRenderer.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
};


export default SwitchRenderer;
