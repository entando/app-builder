import React from 'react';
import PropTypes from 'prop-types';

import { Switch } from 'patternfly-react';

const RenderSwitchInput = ({ input: { onChange } }) =>
  <Switch onChange={(el, value) => onChange(value)} />;


RenderSwitchInput.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
};


export default RenderSwitchInput;
