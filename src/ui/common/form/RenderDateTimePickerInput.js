import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'patternfly-react';
import { Field } from 'redux-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { isNull } from 'lodash';
import { formattedText } from '@entando/utils';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import { zeroFill } from 'helpers/entities';

class RenderDatePickerInput extends Component {
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
    const optionsHours = this.props.hoursList.map(item => ({
      value: zeroFill(item),
      text: zeroFill(item),
    }));
    const optionsMinutes = this.props.minutesList.map(item => ({
      value: zeroFill(item),
      text: zeroFill(item),
    }));
    const optionsSeconds = this.props.secondsList.map(item => ({
      value: zeroFill(item),
      text: zeroFill(item),
    }));

    const {
      input, name, label, help, locale, dateFormat, placeholder, meta: { touched, error },
    } = this.props;
    return (
      <div className="form-group" >
        <label htmlFor={name} className="col-xs-2 control-label">
          {label} {help}
        </label>
        <Col xs={10}>
          <Col xs={4}>
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
          <Col xs={2}>
            <Field
              name={`${input.name}_ts_hours`}
              label={formattedText('app.timestamp.hours')}
              options={optionsHours}
              component={RenderSelectInput}
              selectedValue={input.value}
            />
          </Col>
          <Col xs={2}>
            <Field
              label={formattedText('app.timestamp.minutes')}
              name={`${input.name}_ts_minutes`}
              options={optionsMinutes}
              component={RenderSelectInput}
            />
          </Col>
          <Col xs={2}>
            <Field
              label={formattedText('app.timestamp.seconds')}
              name={`${input.name}_ts_seconds`}
              options={optionsSeconds}
              component={RenderSelectInput}
            />
          </Col>
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

RenderDatePickerInput.propTypes = {
  onWillMount: PropTypes.func,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
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
  hoursList: PropTypes.arrayOf(PropTypes.string),
  minutesList: PropTypes.arrayOf(PropTypes.string),
  secondsList: PropTypes.arrayOf(PropTypes.string),
};

RenderDatePickerInput.defaultProps = {
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
export default RenderDatePickerInput;
