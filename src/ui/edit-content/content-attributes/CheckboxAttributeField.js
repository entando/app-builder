import React from 'react';
import PropTypes from 'prop-types';
import {
  fieldInputPropTypes,
  fieldMetaPropTypes,
} from 'redux-form';

import SwitchRenderer from 'ui/common/form/SwitchRenderer';

const CheckboxAttributeField = ({
  label,
  input,
  meta,
  ...rest
}) => {
  const switchVals = {
    trueValue: 'true',
    falseValue: 'false',
  };

  const { name, value: inputValue, onChange: inputOnChange } = input;

  const attrInput = {
    ...input,
    name,
    value: inputValue || switchVals.falseValue,
    onChange: (val) => {
      inputOnChange(val);
    },
  };

  return (
    <SwitchRenderer
      input={attrInput}
      meta={meta}
      label={label}
      {...switchVals}
      {...rest}
    />
  );
};

CheckboxAttributeField.propTypes = {
  label: PropTypes.node.isRequired,
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
};

export default CheckboxAttributeField;
