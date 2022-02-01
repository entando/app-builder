import React from 'react';
import PropTypes from 'prop-types';
import { ToggleButtonGroup, ToggleButton, ButtonToolbar } from 'react-bootstrap';
import { Col, ControlLabel } from 'patternfly-react';
import { getTouchErrorByField } from 'helpers/formikUtils';

const buttonToolbar = (field, toggleElement, defaultValue) => (
  <div data-testid={`${field.name}-field`}>
    <ButtonToolbar className="RenderRadioInput" aria-labelledby={`radiogroup-${field.name}`}>
      <ToggleButtonGroup
        type="radio"
        {...field}
        value={field.value || defaultValue}
      >
        { toggleElement.map(item => (
          <ToggleButton
            {...field}
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
  </div>
);

const RenderRadioInput = ({
  append, label, labelSize, alignClass,
  field, form, help, toggleElement, defaultValue,
}) => {
  const { touched, error } = getTouchErrorByField(field.name, form);
  if (label) {
    return (
      <div className={`RadioInputRenderer ${(touched && error) ? 'form-group has-error' : 'form-group'}`}>
        <Col xs={labelSize} className={alignClass}>
          <ControlLabel htmlFor={field.name} id={`radiogroup-${field.name}`}>
            {label} {help}
          </ControlLabel>
        </Col>
        <Col xs={12 - labelSize}>
          {buttonToolbar(field, toggleElement, defaultValue)}
          {append && <span className="AppendedLabel">{append}</span>}
          {touched && ((error && <span className="help-block">{error}</span>))}
        </Col>
      </div>
    );
  }
  return buttonToolbar(field, toggleElement, defaultValue);
};

RenderRadioInput.propTypes = {
  toggleElement: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  })),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  alignClass: PropTypes.string,
  labelSize: PropTypes.number,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  append: PropTypes.string,
  help: PropTypes.node,
  label: PropTypes.node,
  field: PropTypes.shape({
    name: PropTypes.string,
  }),
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }),
};
RenderRadioInput.defaultProps = {
  toggleElement: [{
    id: '',
    label: '',
  }],
  defaultValue: '',
  alignClass: 'text-right',
  labelSize: 2,
  meta: {},
  append: '',
  help: null,
  label: null,
  field: {},
  form: {},
};

export default RenderRadioInput;
