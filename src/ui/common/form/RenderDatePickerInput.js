import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Icon, ControlLabel } from 'patternfly-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { isNull } from 'lodash';

class RenderDatePickerInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { onDidMount, ...otherProps } = this.props;
    onDidMount(otherProps);
  }

  handleChange(date) {
    const {
      dateFormat, input, onPickDate, maxDate, minDate,
    } = this.props;
    const value = !isNull(date) ? date.format(dateFormat) : '';
    const dateValue = moment(value, dateFormat);
    if (maxDate && dateValue > maxDate) return;
    if (minDate && dateValue < minDate) return;
    input.onChange(value);
    onPickDate(value);
  }

  render() {
    const {
      input,
      name,
      label,
      help,
      locale,
      dateFormat,
      alignClass,
      placeholder,
      meta: { touched, error },
      isClearable,
      hasCalendarIcon,
      hasLabel,
      labelSize,
      inputSize,
      xsClass,
      maxDate,
      minDate,
    } = this.props;

    const errorblock = touched ? error : '';
    const calendar = hasCalendarIcon ? (
      <span className="calendar-icon" type="submit">
        <Icon name="calendar" />
      </span>
    ) : null;
    const dateLimitProps = { ...(maxDate && { maxDate }), ...(minDate && { minDate }) };
    return (
      <div className={`RenderDatePickerInput ${(touched && error) ? 'form-group has-error' : 'form-group'}`}>
        {hasLabel && (
        <Col xs={12} sm={labelSize} className={`${alignClass} ${xsClass}`}>
          <ControlLabel htmlFor={name}>
            {label} {help}
          </ControlLabel>
        </Col>
        )}
        <Col xs={12} sm={inputSize || 12 - labelSize} className="RenderDatePickerInput__container">
          <DatePicker
            {...input}
            {...dateLimitProps}
            placeholder={placeholder}
            selected={input.value ? moment(input.value, dateFormat) : null}
            onChange={this.handleChange}
            disabledKeyboardNavigation
            locale={locale}
            autoComplete="off"
            dateFormat={dateFormat}
            isClearable={isClearable}
            calendarClassName="RenderDatePickerInput__calendar"
            style={{ after: 'fa fa-calendar', display: 'inline-block' }}
          />
          {calendar}
          <div className="help-block help-block-error">{errorblock}</div>
        </Col>
      </div>
    );
  }
}

RenderDatePickerInput.propTypes = {
  onDidMount: PropTypes.func,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
  }),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  alignClass: PropTypes.string,
  xsClass: PropTypes.string,
  label: PropTypes.node,
  help: PropTypes.node,
  language: PropTypes.string,
  dateFormat: PropTypes.string,
  locale: PropTypes.string,
  isClearable: PropTypes.bool,
  hasLabel: PropTypes.bool,
  hasCalendarIcon: PropTypes.bool,
  labelSize: PropTypes.number,
  inputSize: PropTypes.number,
  onPickDate: PropTypes.func,
  maxDate: PropTypes.objectOf({}),
  minDate: PropTypes.objectOf({}),
};

RenderDatePickerInput.defaultProps = {
  onDidMount: () => {},
  name: '',
  placeholder: '',
  label: '',
  help: null,
  language: 'en',
  dateFormat: 'DD/MM/YYYY',
  locale: 'en',
  meta: {},
  isClearable: true,
  hasLabel: true,
  alignClass: '',
  hasCalendarIcon: false,
  labelSize: 2,
  inputSize: null,
  xsClass: 'mobile-left',
  onPickDate: () => {},
  maxDate: null,
  minDate: null,
};
export default RenderDatePickerInput;
