import React from 'react';
import PropTypes from 'prop-types';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';

import TextAreaInput from 'ui/common/form/RenderTextAreaInput';
import DebouncedInput from 'ui/common/form/DebouncedInput';

const LongtextAttributeField = ({
  label,
  input,
  meta,
  ...rest
}) => {
  const { name, value: inputValue, onChange: inputOnChange } = input;

  const attrInput = {
    ...input,
    name,
    value: inputValue || '',
    onChange: (event) => {
      inputOnChange(event.target.value);
    },
  };

  return (
    <DebouncedInput
      inputComponent={TextAreaInput}
      input={attrInput}
      label={label}
      meta={meta}
      rows={3}
      cols={50}
      {...rest}
    />
  );
};

LongtextAttributeField.propTypes = {
  label: PropTypes.node.isRequired,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
};

export default LongtextAttributeField;
