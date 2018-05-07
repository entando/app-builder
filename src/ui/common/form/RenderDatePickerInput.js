import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'patternfly-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class RenderDatePickerInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  handleChange(date) {
    this.props.input.onChange(moment(date).format('DD-MM-YYYY'));
  }

  render() {
    const {
      input, name, label, help,
    } = this.props;
    return (
      <div className="form-group" >
        <label htmlFor={name} className="col-xs-2 control-label">
          {label} {help}
        </label>
        <Col xs={10}>
          <DatePicker
            {...input}
            selected={input.value ? moment(input.value, 'YYYY-MM-DD HH:mm:ss') : null}
            onChange={this.handleChange}
            disabledKeyboardNavigation
            dateFormat="YYYY-MM-DD HH:mm:ss"
            calendarClassName="RenderDatePickerInput__calendar"
          />
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
  name: PropTypes.string,
  label: PropTypes.node,
  help: PropTypes.node,
  language: PropTypes.string,
};

RenderDatePickerInput.defaultProps = {
  onWillMount: () => {},
  name: '',
  label: '',
  help: null,
  language: 'en',
};
export default RenderDatePickerInput;
