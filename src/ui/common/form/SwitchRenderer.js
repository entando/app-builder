import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Col, ControlLabel } from 'patternfly-react';

const switchField = (input, switchValue, trueValue, falseValue, onToggleValue, dataTestId) => {
  const handleChange = (el, val) => {
    const returnVal = val ? trueValue : falseValue;
    input.onChange(returnVal);
    if (onToggleValue) {
      onToggleValue(returnVal);
    }
  };
  const switchComponent = (<Switch
    {...input}
    value={switchValue}
    onChange={handleChange}
  />);
  if (dataTestId) {
    return (
      <div data-testid={dataTestId}>
        {switchComponent}
      </div>);
  }
  return (switchComponent);
};

const SwitchRenderer = ({
  input, append, label, labelSize, inputSize, alignClass, meta: { touched, error },
  help, trueValue, falseValue, disabled, onToggleValue,
  'data-testid': dataTestId,
}) => {
  const switchValue = input.value === 'true' || input.value === true || input.value === trueValue;
  if (label) {
    return (
      <div className={`SwitchRenderer ${(touched && error) ? 'form-group has-error' : 'form-group'}`}>
        <Col xs={labelSize} className={alignClass}>
          <ControlLabel id={`switch-${input.name}`} htmlFor={input.name}>
            {label} {help}
          </ControlLabel>
        </Col>
        <Col xs={inputSize || 12 - labelSize}>
          <div aria-labelledby={`switch-${input.name}`}>
            {switchField(
                { ...input, disabled }, switchValue, trueValue, falseValue,
                onToggleValue, dataTestId,
            )}
          </div>
          {append && <span className="AppendedLabel">{append}</span>}
          {touched && ((error && <span className="help-block">{error}</span>))}
        </Col>
      </div>);
  }

  return switchField(
    { ...input, disabled },
    switchValue, trueValue, falseValue, onToggleValue, dataTestId,
  );
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
  inputSize: PropTypes.number,
  append: PropTypes.string,
  alignClass: PropTypes.string,
  onToggleValue: PropTypes.func,
  'data-testid': PropTypes.string,
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
  inputSize: null,
  append: '',
  alignClass: 'text-right',
  onToggleValue: null,
  'data-testid': '',
};

export default SwitchRenderer;
