import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Col, ControlLabel } from 'patternfly-react';
import { useForceUpdate } from 'hooks/useForceUpdate';
import { useOnScreen } from 'hooks/useOnScreen';

const SwitchField = (input, switchValue, trueValue, falseValue, onToggleValue, dataTestId) => {
  const forceUpdate = useForceUpdate();

  const ref = React.useRef();
  const isVisible = useOnScreen(ref);

  const handleChange = (el, val) => {
    const returnVal = val ? trueValue : falseValue;
    input.onChange(returnVal);
    if (onToggleValue) {
      onToggleValue(returnVal);
    }
  };

  // force update to re-render the switch component since the
  // component has clearly has bug and we need for it to re-render
  React.useEffect(() => {
    if (isVisible) {
      forceUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <div data-testid={dataTestId} ref={ref}>
      <Switch
        {...input}
        value={switchValue}
        onChange={handleChange}
      />
    </div>
  );
};

const SwitchRenderer = ({
  input, append, label, labelSize, inputSize, alignClass, meta: { touched, error },
  help, trueValue, falseValue, disabled, onToggleValue,
}) => {
  const switchValue = input.value === 'true' || input.value === true || input.value === trueValue;
  const dataTestId = `${input.name}-switchField`;
  if (label) {
    return (
      <div className={`SwitchRenderer ${(touched && error) ? 'form-group has-error' : 'form-group'}`}>
        <Col xs={labelSize} className={alignClass}>
          <ControlLabel id={`switch-${input.name}`} htmlFor={input.name}>
            {label} {help}
          </ControlLabel>
        </Col>
        <Col xs={inputSize || 12 - labelSize}>
          <div aria-labelledby={`switch-${input.name}`} >
            {SwitchField(
              { ...input, disabled }, switchValue, trueValue, falseValue,
              onToggleValue, dataTestId,
            )}
          </div>
          {append && <span className="AppendedLabel">{append}</span>}
          {touched && ((error && <span className="help-block">{error}</span>))}
        </Col>
      </div>);
  }

  return SwitchField(
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
