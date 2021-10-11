import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'patternfly-react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { isNull, padStart } from 'lodash';

class RenderCMSDateTimePickerInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    const { dateFormat, input: { onChange: inputOnChange } } = this.props;
    const value = !isNull(date) ? date.format(dateFormat) : '';
    inputOnChange(value);
  }

  render() {
    const {
      input, name, label, help, locale, dateFormat, placeholder,
      meta: { touched, error }, hoursList, minutesList, secondsList,
      isClearable, hasLabel,
    } = this.props;
    const optionsHours = hoursList.map(item => padStart(item, 2, '0'));
    const optionsMinutes = minutesList.map(item => padStart(item, 2, '0'));
    const optionsSeconds = secondsList.map(item => padStart(item, 2, '0'));

    return (
      <div className="form-group">
        {hasLabel && (
          <label htmlFor={name} className="col-xs-2 control-label">
            {label} {help}
          </label>
        )}
        <Col xs={10}>
          <Row>
            <Col xs={3}>
              <DatePicker
                {...input}
                value={input.value.date}
                placeholder={placeholder}
                selected={input.value.date ? moment(input.value.date, dateFormat) : null}
                onChange={this.handleChange}
                disabledKeyboardNavigation
                locale={locale}
                dateFormat={dateFormat}
                isClearable={isClearable}
                calendarClassName="RenderDatePickerInput__calendar"
              />
            </Col>
            <Col xs={3}>
              <Field
                name={`${input.name}.hours`}
                component="select"
                className="form-control"
              >
                { optionsHours.map(value => (<option key={value}>{value}</option>)) }
              </Field>
              <span className="help help-block">
                <FormattedMessage id="cms.datetimepicker.label.hours" />
              </span>
            </Col>
            <Col xs={3}>
              <Field
                name={`${input.name}.minutes`}
                component="select"
                className="form-control"
              >
                { optionsMinutes.map(value => (<option key={value}>{value}</option>)) }
              </Field>
              <span className="help help-block">
                <FormattedMessage id="cms.datetimepicker.label.minutes" />
              </span>
            </Col>
            <Col xs={3}>
              <Field
                name={`${input.name}.seconds`}
                component="select"
                className="form-control"
              >
                { optionsSeconds.map(value => (<option key={value}>{value}</option>)) }
              </Field>
              <span className="help help-block">
                <FormattedMessage id="cms.datetimepicker.label.seconds" />
              </span>
            </Col>
          </Row>
          <Col xs={12}>
            <div className="help-block help-block-error">
              {touched ? error : ''}
            </div>
          </Col>
        </Col>
      </div>
    );
  }
}

RenderCMSDateTimePickerInput.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.shape({
      date: PropTypes.string,
    })]),
    name: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.shape({}),
  }),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.node,
  help: PropTypes.node,
  language: PropTypes.string,
  dateFormat: PropTypes.string,
  locale: PropTypes.string,
  hoursList: PropTypes.arrayOf(PropTypes.number),
  minutesList: PropTypes.arrayOf(PropTypes.number),
  secondsList: PropTypes.arrayOf(PropTypes.number),
  isClearable: PropTypes.bool,
  hasLabel: PropTypes.bool,
};

RenderCMSDateTimePickerInput.defaultProps = {
  name: '',
  placeholder: '',
  label: '',
  help: null,
  language: 'en',
  dateFormat: 'DD/MM/YYYY',
  locale: 'en',
  meta: {},
  hoursList: Array.from(Array(24).keys()),
  minutesList: Array.from(Array(60).keys()),
  secondsList: Array.from(Array(60).keys()),
  isClearable: true,
  hasLabel: true,
};
export default RenderCMSDateTimePickerInput;
