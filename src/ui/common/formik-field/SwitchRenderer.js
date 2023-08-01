import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Col, ControlLabel } from 'patternfly-react';

const SwitchField = (field, switchValue, trueValue, falseValue, onToggleValue, dataTestId) => {
  const handleChange = (el, val) => {
    const returnVal = val ? trueValue : falseValue;
    field.onChange(returnVal);
    if (onToggleValue) {
      onToggleValue(returnVal);
    }
  };

  return (
    <div data-testid={dataTestId}>
      <Switch
        {...field}
        value={switchValue}
        onChange={handleChange}
      />
    </div>
  );
};

const SwitchRenderer = ({
  field, append, label, labelSize, inputSize, alignClass, meta: { touched, error },
  help, trueValue, falseValue, disabled, onToggleValue,
}) => {
  const switchValue = field.value === 'true' || field.value === true || field.value === trueValue;
  const dataTestId = `${field.name}-switchField`;
  if (label) {
    return (
      <div className={`SwitchRenderer ${(touched && error) ? 'form-group has-error' : 'form-group'}`}>
        <Col xs={labelSize} className={alignClass}>
          <ControlLabel id={`switch-${field.name}`} htmlFor={field.name}>
            {label} {help}
          </ControlLabel>
        </Col>
        <Col xs={inputSize || 12 - labelSize}>
          <div aria-labelledby={`switch-${field.name}`} >
            {SwitchField(
              { ...field, disabled }, switchValue, trueValue, falseValue,
              onToggleValue, dataTestId,
            )}
          </div>
          {append && <span className="AppendedLabel">{append}</span>}
          {touched && ((error && <span className="help-block">{error}</span>))}
        </Col>
      </div>);
  }

  return SwitchField(
    { ...field, disabled },
    switchValue, trueValue, falseValue, onToggleValue, dataTestId,
  );
};

SwitchRenderer.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  trueValue: PropTypes.any,
  falseValue: PropTypes.any,
  /* eslint-enable react/forbid-prop-types */
  field: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.node,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  help: PropTypes.node,
  disabled: PropTypes.bool,
  labelSize: PropTypes.number,
  inputSize: PropTypes.number,
  append: PropTypes.string,
  alignClass: PropTypes.string,
  onToggleValue: PropTypes.func,
};

SwitchRenderer.defaultProps = {
  trueValue: true,
  falseValue: false,
  label: '',
  meta: {},
  help: null,
  disabled: false,
  labelSize: 2,
  inputSize: null,
  append: '',
  alignClass: 'text-right',
  onToggleValue: null,
};

export default SwitchRenderer;
