import React from 'react';
import PropTypes from 'prop-types';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';
import { FormattedMessage } from 'react-intl';

import RadioInput from 'ui/common/form/RenderRadioInput';

const BooleanAttributeField = ({
  label,
  input,
  meta,
  langCode,
  selectedLangTab,
  ...rest
}) => {
  if (langCode !== selectedLangTab) {
    return null;
  }

  const toggleElements = [
    { id: 'true', label: <FormattedMessage id="cms.label.yes" /> },
    { id: 'false', label: <FormattedMessage id="cms.label.no" /> },
  ];

  const { name, value: inputValue, onChange: inputOnChange } = input;

  const attrInput = {
    ...input,
    name,
    value: `${inputValue || 'false'}`,
    onChange: (val) => {
      inputOnChange(val);
    },
  };

  return (
    <RadioInput
      input={attrInput}
      meta={meta}
      toggleElement={toggleElements}
      label={label}
      {...rest}
    />
  );
};

BooleanAttributeField.propTypes = {
  label: PropTypes.node.isRequired,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  langCode: PropTypes.string.isRequired,
  selectedLangTab: PropTypes.string.isRequired,
};

export default BooleanAttributeField;
