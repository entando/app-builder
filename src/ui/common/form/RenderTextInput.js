import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel } from 'patternfly-react';

const RenderTextInput = ({
  input, append, label, labelSize, inputSize, alignClass, tourClass, placeholder,
  meta: { touched, error }, help, disabled, type, lowerCaseOnly,
}) => {
  let inputProps = input;

  if (lowerCaseOnly) {
    const { onChange } = input;

    inputProps = {
      ...input,
      onChange: (event) => {
        onChange(event.target.value.toLowerCase());
      },
    };
  }

  return (
    <div className={(touched && error) ? `form-group has-error ${tourClass}` : `form-group ${tourClass}`}>
      {
        labelSize > 0 ? (
          <Col xs={labelSize} className={alignClass}>
            <ControlLabel htmlFor={input.name}>
              {label} {help}
            </ControlLabel>
          </Col>
        ) : ''
      }
      <Col xs={inputSize || 12 - labelSize}>
        <input
          {...inputProps}
          type={type}
          id={input.name}
          placeholder={placeholder}
          className="form-control RenderTextInput"
          disabled={disabled}
        />
        {append && <span className="AppendedLabel">{append}</span>}
        {touched && ((error && <span className="help-block">{error}</span>))}
      </Col>
    </div>
  );
};

RenderTextInput.propTypes = {
  input: PropTypes.shape({}),
  label: PropTypes.node,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({}),
  help: PropTypes.node,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  labelSize: PropTypes.number,
  inputSize: PropTypes.number,
  append: PropTypes.string,
  alignClass: PropTypes.string,
  tourClass: PropTypes.string,
  lowerCaseOnly: PropTypes.bool,
};

RenderTextInput.defaultProps = {
  input: {},
  label: '',
  placeholder: '',
  meta: {},
  help: null,
  disabled: false,
  type: 'text',
  labelSize: 2,
  inputSize: null,
  append: '',
  tourClass: '',
  alignClass: 'text-right',
  lowerCaseOnly: false,
};
export default RenderTextInput;
