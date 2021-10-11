import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel } from 'patternfly-react';

export const RenderTextInputBody = ({
  input,
  append,
  label,
  labelSize,
  inputSize,
  alignClass,
  placeholder,
  meta: { touched, error },
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
  return (
    <div className={touched && error ? 'form-group has-error' : 'form-group'}>
      {hasLabel && labelSize > 0 && (
        <Col xs={12} sm={labelSize} className={`${alignClass} ${xsClass}`}>
          <ControlLabel htmlFor={input.name}>
            {label} {help}
          </ControlLabel>
        </Col>
      )}
      <Col xs={12} sm={inputSize || 12 - labelSize}>
        <div className="RenderTextInput__input-body">
          <input
            {...input}
            type={type}
            id={input.name}
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
        {touched && (error && <span className="help-block">{error}</span>)}
      </Col>
    </div>
  );
};

RenderTextInputBody.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
  }),
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  label: PropTypes.node,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
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
  mainGroup: '',
  langCode: '',
  alignClass: 'text-right',
  hasLabel: true,
  xsClass: 'mobile-left',
  forwardedRef: null,
  endButtons: null,
};

export default React.forwardRef((props, ref) => (
  <RenderTextInputBody {...props} forwardedRef={ref} />
));
