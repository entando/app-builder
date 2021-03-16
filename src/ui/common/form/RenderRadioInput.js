import React from 'react';
import PropTypes from 'prop-types';
import { ToggleButtonGroup, ToggleButton, ButtonToolbar } from 'react-bootstrap';
import { Col, ControlLabel } from 'patternfly-react';

const buttonToolbar = (input, toggleElement, defaultValue) => (
  <ButtonToolbar className="RenderRadioInput" aria-labelledby={`radiogroup-${input.name}`}>
    <ToggleButtonGroup
      type="radio"
      {...input}
      value={input.value ? input.value : defaultValue}
    >
      { toggleElement.map(item => (
        <ToggleButton
          key={item.id}
          value={item.id}
          className="RenderRadioInput__toggle-btn"
        >
          {item.label}
        </ToggleButton>
      ))
      }
    </ToggleButtonGroup>
  </ButtonToolbar>
);

const RenderRadioInput = ({
  input, append, label, labelSize, alignClass,
  meta: { touched, error }, help, toggleElement, defaultValue,
  'data-testid': dataTestId,
}) => {
  if (label) {
    return (
      <div className={`RadioInputRenderer ${(touched && error) ? 'form-group has-error' : 'form-group'}`} data-testid={dataTestId}>
        <Col xs={labelSize} className={alignClass}>
          <ControlLabel htmlFor={input.name} id={`radiogroup-${input.name}`}>
            {label} {help}
          </ControlLabel>
        </Col>
        <Col xs={12 - labelSize}>
          {buttonToolbar(input, toggleElement, defaultValue)}
          {append && <span className="AppendedLabel">{append}</span>}
          {touched && ((error && <span className="help-block">{error}</span>))}
        </Col>
      </div>
    );
  }
  return (
    <div data-testid={dataTestId}>
      {buttonToolbar(input, toggleElement, defaultValue)}
    </div>
  );
};

RenderRadioInput.propTypes = {
  toggleElement: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  })),
  input: PropTypes.shape({}).isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  alignClass: PropTypes.string,
  labelSize: PropTypes.number,
  'data-testid': PropTypes.string,

};
RenderRadioInput.defaultProps = {
  toggleElement: [{
    id: '',
    label: '',
  }],
  defaultValue: '',
  alignClass: 'text-right',
  labelSize: 2,
  'data-testid': '',
};

export default RenderRadioInput;
