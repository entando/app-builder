import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel } from 'patternfly-react';

const RenderTextAreaInput = ({
  input, append, label, labelSize, placeholder, alignClass,
  meta: { touched, error }, help, disabled, cols, rows,
}) => (

  <div className={`RenderTextAreaInput ${(touched && error) ? 'form-group has-error' : 'form-group'}`}>
    {
      (label || help) &&
      <Col xs={labelSize} className={`RenderTextAreaInput-label ${alignClass}`}>
        <ControlLabel htmlFor={input.name}>
          {label} {help}
        </ControlLabel>
      </Col>
    }
    <Col xs={12 - labelSize} className="RenderTextAreaInput-content">
      <textarea
        {...input}
        cols={cols}
        rows={rows}
        placeholder={placeholder}
        className="form-control RenderTextAreaInput-textarea"
        disabled={disabled}
      />
      {append && <span className="AppendedLabel">{append}</span>}
      {touched && ((error && <span className="help-block">{error}</span>))}
    </Col>
  </div>

);

RenderTextAreaInput.propTypes = {
  input: PropTypes.shape({}),
  name: PropTypes.string,
  label: PropTypes.node,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({}),
  help: PropTypes.node,
  disabled: PropTypes.bool,
  labelSize: PropTypes.number,
  append: PropTypes.string,
  alignClass: PropTypes.string,
  cols: PropTypes.number,
  rows: PropTypes.number,
};

RenderTextAreaInput.defaultProps = {
  input: {},
  name: '',
  label: '',
  placeholder: '',
  meta: {},
  help: null,
  disabled: false,
  labelSize: 2,
  append: '',
  alignClass: 'text-right',
  cols: 20,
  rows: 20,
};
export default RenderTextAreaInput;
