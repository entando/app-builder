import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';

import DateTimePickerInput from 'ui/common/form/RenderCMSDateTimePickerInput';
import { generateNumArray } from 'helpers/arrayUtils';

const TimestampAttributeField = ({
  label,
  input,
  meta,
  ...rest
}) => {
  const dateFormat = 'DD/MM/YYYY';
  const hoursList = generateNumArray(24);
  const minutesList = generateNumArray(60);
  const secondsList = generateNumArray(60);
  const timeOptions = {
    hoursList,
    minutesList,
    secondsList,
  };

  const { name, value: inputValue, onChange: inputOnChange } = input;
  const {
    date, hours, minutes, seconds,
  } = inputValue instanceof Object ? inputValue : { date: inputValue };

  let inputDateFormat = dateFormat;
  if (date && date.includes('-')) inputDateFormat = 'YYYY-MM-DD';
  const actualValue = {
    date: date && moment(date, inputDateFormat).format(dateFormat),
    hours,
    minutes,
    seconds,
  };

  const attrInput = {
    name,
    value: actualValue,
    onChange: (val) => {
      inputOnChange({
        date: val,
        hours,
        minutes,
        seconds,
      });
    },
  };

  useEffect(() => {
    attrInput.onChange(actualValue.date);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DateTimePickerInput
      input={attrInput}
      label={label}
      meta={meta}
      dateFormat={dateFormat}
      isClearable={false}
      {...timeOptions}
      {...rest}
    />
  );
};

TimestampAttributeField.propTypes = {
  label: PropTypes.node.isRequired,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
};

export default TimestampAttributeField;
