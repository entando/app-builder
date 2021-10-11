import React from 'react';
import PropTypes from 'prop-types';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';

import CopyTextButton from 'ui/common/button/CopyTextButton';
import TextInput from 'ui/common/form/RenderTextInput';
import DebouncedInput from 'ui/common/form/DebouncedInput';

const TextAttributeField = ({
  label,
  input,
  meta,
  locale,
  langCode,
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
      inputComponent={TextInput}
      input={attrInput}
      label={label}
      meta={meta}
      {...(
        langCode === locale
        && { endButtons: (<CopyTextButton text={attrInput.value} />) }
      )}
      {...rest}
    />
  );
};

TextAttributeField.propTypes = {
  label: PropTypes.node.isRequired,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  langCode: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

export default TextAttributeField;
