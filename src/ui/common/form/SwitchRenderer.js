import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Col, ControlLabel } from 'patternfly-react';

const switchField = (input, switchValue, trueValue, falseValue) => (<Switch
  {...input}
  value={switchValue}
  onChange={(el, val) => input.onChange(val ? trueValue : falseValue)}
/>);

const SwitchRenderer = ({
  input, append, label, labelSize, alignClass,
  meta: { touched, error }, help, trueValue, falseValue,
}) => {
  const switchValue = input.value === 'true' || input.value === true || input.value === trueValue;
  if (label) {
    return (
      <div className={`SwitchRenderer ${(touched && error) ? 'form-group has-error' : 'form-group'}`}>
        <Col xs={labelSize} className={alignClass}>
          <ControlLabel htmlFor={input.name}>
            {label} {help}
          </ControlLabel>
        </Col>
        <Col xs={12 - labelSize}>
          {switchField(input, switchValue, trueValue, falseValue)}
          {append && <span className="AppendedLabel">{append}</span>}
          {touched && ((error && <span className="help-block">{error}</span>))}
        </Col>
      </div>);
  }

  return switchField(input, switchValue, trueValue, falseValue);
};

SwitchRenderer.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  trueValue: PropTypes.any,
  falseValue: PropTypes.any,
  /* eslint-enable react/forbid-prop-types */
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.node,
  meta: PropTypes.shape({}),
  help: PropTypes.node,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  labelSize: PropTypes.number,
  append: PropTypes.string,
  alignClass: PropTypes.string,
};

SwitchRenderer.defaultProps = {
  trueValue: true,
  falseValue: false,
  label: '',
  meta: {},
  help: null,
  disabled: false,
  type: 'text',
  labelSize: 2,
  append: '',
  alignClass: 'text-right',
};

export default SwitchRenderer;
