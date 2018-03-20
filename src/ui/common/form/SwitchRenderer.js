import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'patternfly-react';

const SwitchRenderer = ({ input, trueValue, falseValue }) => {
  const switchValue = input.value === 'true' || input.value === true || input.value === trueValue;
  return (<Switch
    {...input}
    value={switchValue}
    onChange={(el, val) => input.onChange(val ? trueValue : falseValue)}
  />);
};


SwitchRenderer.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  trueValue: PropTypes.any,
  falseValue: PropTypes.any,
  /* eslint-enable react/forbid-prop-types */
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
};

SwitchRenderer.defaultProps = {
  trueValue: true,
  falseValue: false,
};

export default SwitchRenderer;
