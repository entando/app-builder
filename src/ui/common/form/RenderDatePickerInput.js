import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'patternfly-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { isNull } from 'lodash';

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
    const {
      input, name, label, help, locale, dateFormat, placeholder, meta: { touched, error },
    } = this.props;

    return (
      <div className="form-group" >
        <label htmlFor={name} className="col-xs-2 control-label">
          {label} {help}
        </label>
        <Col xs={10}>
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
          <div className="help-block help-block-error">
            {touched ? error : ''}
          </div>
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
};
export default RenderDatePickerInput;
