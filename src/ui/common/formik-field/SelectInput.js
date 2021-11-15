import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel } from 'patternfly-react';
import { injectIntl, intlShape, defineMessages } from 'react-intl';

import { getTouchErrorByField } from 'helpers/formikUtils';

const SelectInput = ({
  field,
  form,
  forwardedRef,
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
  const { touched, error } = getTouchErrorByField(field.name, form);

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

  const errorBox = touched && error ? <span role="alert" className="help-block">{error}</span> : null;

  return (
    <div className={containerClasses}>
      {hasLabel && (
        <Col xs={12} sm={labelSize} className={`${alignClass} ${xsClass}`}>
          <ControlLabel htmlFor={field.name}>
            {label} {help}
          </ControlLabel>
        </Col>
      )}
      <Col xs={12} sm={inputSize || 12 - labelSize}>
        <select
          {...field}
          id={field.name}
          size={size}
          className="form-control SelectInput"
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

SelectInput.propTypes = {
  intl: intlShape.isRequired,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }),
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
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

SelectInput.defaultProps = {
  form: {},
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

const IntlWrappedSelectInput = injectIntl(SelectInput);

export default React.forwardRef((props, ref) => (
  <IntlWrappedSelectInput {...props} forwardedRef={ref} />
));
