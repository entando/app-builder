import React from 'react';
import PropTypes from 'prop-types';
import { Col, ControlLabel } from 'patternfly-react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

const RenderSelectInput = ({
  input, meta: { touched, error },
  labelSize, alignClass, label, help,
  defaultOptionId, options, optionReducer,
  optionValue, optionDisplayName, size, inputSize,
  disabled, intl, tourClass,
}) => {
  const containerClasses = (touched && error) ? `form-group has-error ${tourClass}` : `form-group ${tourClass}`;

  const createDefaultOption = (optId) => {
    const msgs = defineMessages({
      defaultOptionId: {
        id: optId,
      },
    });
    return <option value="">{intl.formatMessage(msgs.defaultOptionId)}</option>;
  };

  const defaultOption = defaultOptionId ?
    createDefaultOption(defaultOptionId) :
    null;

  const optionsList = optionReducer ? optionReducer(options) : options.map(item => (
    <option
      key={item[optionValue]}
      value={item[optionValue]}
    >
      {item[optionDisplayName]}
    </option>
  ));

  const errorBox = touched && error ?
    <span className="help-block">{error}</span> :
    null;

  return (
    <div className={containerClasses}>
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
        <select
          {...input}
          size={size}
          className="form-control RenderSelectInput"
          disabled={disabled}
        >
          {defaultOption}
          {optionsList}
        </select>
        {errorBox}
      </Col>
    </div>
  );
};

RenderSelectInput.propTypes = {
  input: PropTypes.shape({}),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
  }),
  defaultOptionId: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    text: PropTypes.string,
  })),
  label: PropTypes.node,
  labelSize: PropTypes.number,
  alignClass: PropTypes.string,
  help: PropTypes.node,
  optionReducer: PropTypes.func,
  optionValue: PropTypes.string,
  optionDisplayName: PropTypes.string,
  size: PropTypes.number,
  inputSize: PropTypes.number,
  disabled: PropTypes.bool,
  intl: intlShape.isRequired,
  tourClass: PropTypes.string,
};

RenderSelectInput.defaultProps = {
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
  help: null,
  optionReducer: null,
  optionValue: 'value',
  optionDisplayName: 'text',
  size: null,
  inputSize: null,
  disabled: false,
  tourClass: '',
};
export default injectIntl(RenderSelectInput);
