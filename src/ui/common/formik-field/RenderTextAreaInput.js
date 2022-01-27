import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel } from 'patternfly-react';
import { getTouchErrorByField } from 'helpers/formikUtils';

const RenderTextAreaInput = ({
  field, append, label, labelSize, placeholder, alignClass,
  form, help, disabled, cols, rows,
  hasLabel, topBarOptions,
}) => {
  const { touched, error } = getTouchErrorByField(field.name, form);
  return (
    <div className={`RenderTextAreaInput ${(touched && error) ? 'form-group has-error' : 'form-group'}`}>
      {((hasLabel && label) || help) && (
        <Col xs={labelSize} className={`RenderTextAreaInput__label ${alignClass}`}>
          <ControlLabel htmlFor={field.name}>
            {label} {help}
          </ControlLabel>
        </Col>
      )}
      <Col xs={12 - labelSize} className="RenderTextAreaInput__content">
        <div className="RenderTextAreaInput__textarea-body">
          {topBarOptions && (
            <div className="RenderTextAreaInput__toolbar-body text-right">
              {topBarOptions}
            </div>
          )}
          <textarea
            {...field}
            cols={cols}
            rows={rows}
            placeholder={placeholder}
            className="form-control RenderTextAreaInput-textarea"
            disabled={disabled}
          />
        </div>
        {append && <span className="AppendedLabel">{append}</span>}
        {touched && (error && <span role="alert" className="help-block">{error}</span>)}
      </Col>
    </div>
  );
};

RenderTextAreaInput.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
  }),
  label: PropTypes.node,
  placeholder: PropTypes.string,
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }),
  help: PropTypes.node,
  disabled: PropTypes.bool,
  labelSize: PropTypes.number,
  append: PropTypes.string,
  alignClass: PropTypes.string,
  cols: PropTypes.number,
  rows: PropTypes.number,
  hasLabel: PropTypes.bool,
  topBarOptions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

RenderTextAreaInput.defaultProps = {
  field: {},
  label: '',
  placeholder: '',
  form: {},
  help: null,
  disabled: false,
  labelSize: 2,
  append: '',
  alignClass: 'text-right',
  cols: 20,
  rows: 20,
  hasLabel: true,
  topBarOptions: null,
};

export default RenderTextAreaInput;
