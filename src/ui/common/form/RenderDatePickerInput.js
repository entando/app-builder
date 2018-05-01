import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Col } from 'patternfly-react';
// import DatePicker from 'react-date-picker';
import { SingleDatePicker } from 'react-dates';

class RenderDatePickerInput extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const {
      input, onChangeDate, time, name,
    } = this.props;
    return (
      <div>
        <SingleDatePicker
          {...input}
          onChange={(ev) => {
             console.log(ev); if (onChangeDate) onChangeDate(ev);
            }}
          value={time}
          name={name}
          calendarType="ISO 8601"
          locale="it-IT"
        />
      </div>
    );
  }
}

RenderDatePickerInput.propTypes = {
  onWillMount: PropTypes.func,
  onChangeDate: PropTypes.func,
  time: PropTypes.string,
  name: PropTypes.string,
  input: PropTypes.string,
};

RenderDatePickerInput.defaultProps = {
  onWillMount: () => {},
  onChangeDate: () => {},
  time: '',
  name: '',
  input: '',

};
export default RenderDatePickerInput;
