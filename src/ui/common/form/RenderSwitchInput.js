import React from 'react';
import PropTypes from 'prop-types';

import { Switch } from 'patternfly-react';

const TRUE_VALUE = 'true';

const RenderSwitchInput = ({ input }) => {
  const switchValue = (input.value === TRUE_VALUE);
  return (
    <Switch
      {...input}
      value={switchValue}
      onChange={(el, value) => input.onChange(value.toString())}
    />
  );
};

RenderSwitchInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
};

export default RenderSwitchInput;
