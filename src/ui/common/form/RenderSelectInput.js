import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel } from 'patternfly-react';
import { injectIntl, intlShape, defineMessages } from 'react-intl';

const RenderSelectInputBody = ({
  input,
  forwardedRef,
  meta: { touched, error },
  labelSize,
  alignClass,
  label,
  help,
  defaultOptionId,
  options,
  optionReducer,
  optionValue,
  optionDisplayName,
  size,
  inputSize,
  disabled,
  intl,
  hasLabel,
  xsClass,
}) => {
  const containerClasses = touched && error ? 'form-group has-error' : 'form-group';

  let defaultOption = null;
  if (defaultOptionId) {
    const defMsg = defineMessages({
      defaultOptionId: {
        id: defaultOptionId,
      },
    });
    defaultOption = <option value="">{intl.formatMessage(defMsg.defaultOptionId)}</option>;
  }

  const optionsList = optionReducer
    ? optionReducer(options)
    : options.map(item => (
      <option key={item[optionValue]} value={item[optionValue]}>
        {item[optionDisplayName]}
      </option>
    ));

  const errorBox = touched && error ? <span className="help-block">{error}</span> : null;

  return (
    <div className={containerClasses}>
      {hasLabel && (
        <Col xs={12} sm={labelSize} className={`${alignClass} ${xsClass}`}>
          <ControlLabel htmlFor={input.name}>
            {label} {help}
          </ControlLabel>
        </Col>
      )}
      <Col xs={12} sm={inputSize || 12 - labelSize}>
        <select
          {...input}
          size={size}
          className="form-control RenderSelectInput"
          disabled={disabled}
          ref={forwardedRef}
        >
          {defaultOption}
          {optionsList}
        </select>
        {errorBox}
      </Col>
    </div>
  );
};

RenderSelectInputBody.propTypes = {
  intl: intlShape.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
  }),
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
  }),
  defaultOptionId: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
  })),
  label: PropTypes.node,
  labelSize: PropTypes.number,
  alignClass: PropTypes.string,
  xsClass: PropTypes.string,
  help: PropTypes.node,
  optionReducer: PropTypes.func,
  optionValue: PropTypes.string,
  optionDisplayName: PropTypes.string,
  size: PropTypes.number,
  inputSize: PropTypes.number,
  disabled: PropTypes.bool,
  hasLabel: PropTypes.bool,
};

RenderSelectInputBody.defaultProps = {
  input: {},
  meta: {
    touched: false,
    error: {},
  },
  defaultOptionId: '',
  options: [],
  label: null,
  labelSize: 2,
  alignClass: 'text-right',
  xsClass: 'mobile-left',
  help: null,
  optionReducer: null,
  optionValue: 'value',
  optionDisplayName: 'text',
  size: null,
  inputSize: null,
  disabled: false,
  hasLabel: true,
  forwardedRef: null,
};

const RenderSelectInput = injectIntl(RenderSelectInputBody);

export default React.forwardRef((props, ref) => (
  <RenderSelectInput {...props} forwardedRef={ref} />
));
