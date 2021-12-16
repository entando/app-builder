import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'patternfly-react';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { isNull } from 'lodash';
import { zeroFill } from 'helpers/entities';

class RenderDateTimePickerInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  handleChange(date) {
    const value = !isNull(date) ? date.format(this.props.dateFormat) : '';
    this.props.input.onChange(value);
  }

  render() {
    const optionsHours = this.props.hoursList.map(item => zeroFill(item));
    const optionsMinutes = this.props.minutesList.map(item => zeroFill(item));
    const optionsSeconds = this.props.secondsList.map(item => zeroFill(item));

    const {
      input, name, label, help, locale, dateFormat, placeholder, meta: { touched, error },
    } = this.props;
    return (
      <div className="form-group" >
        <label htmlFor={name} className="col-xs-2 control-label">
          {label} {help}
        </label>
        <Col xs={10}>
          <Row>
            <Col xs={3}>
              <DatePicker
                {...input}
                placeholder={placeholder}
                selected={input.value ? moment(input.value, this.props.dateFormat) : null}
                onChange={this.handleChange}
                disabledKeyboardNavigation
                locale={locale}
                dateFormat={dateFormat}
                isClearable
                calendarClassName="RenderDatePickerInput__calendar"
              />
            </Col>
            <Col xs={3}>
              <Field
                name={`${input.name}_ts_hours`}
                component="select"
                className="form-control"
              >
                { optionsHours.map(value => (<option key={value}>{value}</option>)) }
              </Field>
              <span className="help help-block">
                <FormattedMessage id="app.timestamp.hours" />
              </span>
            </Col>
            <Col xs={3}>
              <Field
                name={`${input.name}_ts_minutes`}
                component="select"
                className="form-control"
              >
                { optionsMinutes.map(value => (<option key={value}>{value}</option>)) }
              </Field>
              <span className="help help-block">
                <FormattedMessage id="app.timestamp.minutes" />
              </span>
            </Col>
            <Col xs={3}>
              <Field
                name={`${input.name}_ts_seconds`}
                component="select"
                className="form-control"
              >
                { optionsSeconds.map(value => (<option key={value}>{value}</option>)) }
              </Field>
              <span className="help help-block">
                <FormattedMessage id="app.timestamp.seconds" />
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

RenderDateTimePickerInput.propTypes = {
  onWillMount: PropTypes.func,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.bool,
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
};

RenderDateTimePickerInput.defaultProps = {
  onWillMount: () => {},
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
};
export default RenderDateTimePickerInput;
