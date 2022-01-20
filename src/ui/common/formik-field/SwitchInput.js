import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Col, ControlLabel } from 'patternfly-react';
import { getTouchErrorByField } from 'helpers/formikUtils';

const SwitchInput = ({
  field, form, append, label, labelSize, inputSize, alignClass,
  help, trueValue, falseValue, disabled, onToggleValue,
}) => {
  const switchValue = field.value === 'true' || field.value === true || field.value === trueValue;
  const dataTestId = `${field.name}-switchField`;
  const { touched, error } = getTouchErrorByField(field.name, form);

  const handleChange = (el, val) => {
    const returnVal = val ? trueValue : falseValue;
    form.setFieldValue(field.name, returnVal);
    if (onToggleValue) {
      onToggleValue(returnVal);
    }
  };

  if (label) {
    return (
      <div className={`SwitchInput ${(touched && error) ? 'form-group has-error' : 'form-group'}`}>
        <Col xs={labelSize} className={alignClass}>
          <ControlLabel id={`switch-${field.name}`} htmlFor={field.name}>
            {label} {help}
          </ControlLabel>
        </Col>
        <Col xs={inputSize || 12 - labelSize}>
          <div data-testid={dataTestId} aria-labelledby={`switch-${field.name}`}>
            <Switch
              {...field}
              disabled={disabled}
              value={switchValue}
              onChange={handleChange}
            />
          </div>
          {append && <span className="AppendedLabel">{append}</span>}
          {touched && ((error && <span role="alert" className="help-block">{error}</span>))}
        </Col>
      </div>);
  }

  return (
    <div data-testid={dataTestId} aria-labelledby={`switch-${field.name}`}>
      <Switch
        {...field}
        disabled={disabled}
        value={switchValue}
        onChange={handleChange}
      />
    </div>
  );
};

SwitchInput.propTypes = {
  trueValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  falseValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  field: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
    setFieldValue: PropTypes.func.isRequired,
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
};

SwitchInput.defaultProps = {
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
};

export default SwitchInput;
