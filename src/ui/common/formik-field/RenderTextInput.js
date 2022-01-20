import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel } from 'patternfly-react';
import { getTouchErrorByField } from 'helpers/formikUtils';

export const RenderTextInputBody = ({
  field,
  append,
  label,
  labelSize,
  inputSize,
  alignClass,
  placeholder,
  form,
  help,
  disabled,
  type,
  hasLabel,
  xsClass,
  forwardedRef,
  endButtons,
  ...others
}) => {
  const { restProps } = others;
  const { touched, error } = getTouchErrorByField(field.name, form);
  return (
    <div className={touched && error ? 'form-group has-error' : 'form-group'}>
      {hasLabel && labelSize > 0 && (
        <Col xs={12} sm={labelSize} className={`${alignClass} ${xsClass}`}>
          <ControlLabel htmlFor={field.name}>
            {label} {help}
          </ControlLabel>
        </Col>
      )}
      <Col xs={12} sm={inputSize || 12 - labelSize}>
        <div className="RenderTextInput__input-body">
          <input
            {...field}
            type={type}
            id={field.name}
            ref={forwardedRef}
            placeholder={placeholder}
            className="form-control RenderTextInput"
            disabled={disabled}
            {...restProps}
          />
          {endButtons && (
            <div className="RenderTextAreaInput__endbuttons">
              {endButtons}
            </div>
          )}
        </div>
        {append && <span className="AppendedLabel">{append}</span>}
        {touched && (error && <span role="alert" className="help-block">{error}</span>)}
      </Col>
    </div>
  );
};

RenderTextInputBody.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
  }),
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  label: PropTypes.node,
  placeholder: PropTypes.string,
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }),
  help: PropTypes.node,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  labelSize: PropTypes.number,
  inputSize: PropTypes.number,
  append: PropTypes.string,
  mainGroup: PropTypes.string,
  langCode: PropTypes.string,
  alignClass: PropTypes.string,
  xsClass: PropTypes.string,
  hasLabel: PropTypes.bool,
  endButtons: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

RenderTextInputBody.defaultProps = {
  field: {},
  label: '',
  placeholder: '',
  help: null,
  disabled: false,
  type: 'text',
  labelSize: 2,
  inputSize: null,
  append: '',
  mainGroup: '',
  langCode: '',
  alignClass: 'text-right',
  hasLabel: true,
  xsClass: 'mobile-left',
  forwardedRef: null,
  endButtons: null,
  form: {},
};

export default React.forwardRef((props, ref) => (
  <RenderTextInputBody {...props} forwardedRef={ref} />
));
