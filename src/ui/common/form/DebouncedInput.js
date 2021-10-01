import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

const DebouncedInput = ({ inputComponent: InputComponent, input, ...props }) => {
  const { value: inputValue, onChange } = input;

  const [currValue, setCurrValue] = useState(inputValue);

  useEffect(() => {
    setCurrValue(inputValue);
  }, [inputValue]);

  const debouncedOnChange = useCallback(debounce((value) => {
    onChange(value);
  }, 500), []);

  const debouncedInput = {
    ...input,
    value: currValue,
    onChange: (data) => {
      let value = data;
      if (data.target) {
        data.persist();
        ({ value } = data.target);
      }
      setCurrValue(value);
      debouncedOnChange(data);
    },
  };

  return (
    <InputComponent input={debouncedInput} {...props} />
  );
};

DebouncedInput.propTypes = {
  inputComponent: PropTypes.elementType.isRequired,
  input: PropTypes.shape({
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
};

export default DebouncedInput;
