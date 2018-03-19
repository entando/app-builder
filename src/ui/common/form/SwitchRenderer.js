import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'patternfly-react';

const SwitchRenderer = ({ input }) => {
  const switchValue = typeof input.value === 'string' ? (input.value === 'true' || input.value === 'active') : input.value;
  return (<Switch
    {...input}
    value={switchValue}
    onChange={(el, val) => input.onChange(val)}
  />);
};


SwitchRenderer.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
};


export default SwitchRenderer;
