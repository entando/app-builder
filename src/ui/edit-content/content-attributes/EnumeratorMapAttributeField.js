import React from 'react';
import PropTypes from 'prop-types';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';

import SelectInput from 'ui/common/form/RenderSelectInput';
import attributeShape from './attributeShape';

const EnumeratorMapAttributeField = ({
  label,
  input,
  meta,
  attribute,
  ...rest
}) => {
  const optionKeys = {
    optionValue: 'value',
    optionDisplayName: 'displayName',
  };

  const { enumeratorStaticItems: itemsStr, enumeratorStaticItemsSeparator: separator } = attribute;
  const options = itemsStr.split(separator).map(item => ({
    [optionKeys.optionValue]: item.split('=')[0],
    [optionKeys.optionDisplayName]: item.split('=')[1],
  }));

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
    <SelectInput
      input={attrInput}
      label={label}
      meta={meta}
      options={options}
      defaultOptionId="cms.label.chooseoption"
      {...optionKeys}
      {...rest}
    />
  );
};

EnumeratorMapAttributeField.propTypes = {
  label: PropTypes.node.isRequired,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
  attribute: PropTypes.shape(attributeShape).isRequired,
};

export default EnumeratorMapAttributeField;
