import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray, getIn } from 'formik';

export const getTouchErrorByField = (fieldName, { touched, errors }) => ({
  touched: touched ? getIn(touched, fieldName) : '',
  error: errors ? getIn(errors, fieldName) : '',
});

export const MultiField = ({
  name,
  component: Component,
  validateOnChange,
  ...otherProps
}) => (
  <FieldArray
    name={name}
    validateOnChange={validateOnChange}
    render={arrayHelpers => (
      <Component
        {...arrayHelpers}
        {...otherProps}
      />
    )}
  />
);


export const convertReduxValidationsToFormikValidations = (value, validators) => {
  let errors = null;
  validators.forEach((validator) => {
    const validate = validator(value);
    if (validate) errors = validate;
  });

  return errors;
};

MultiField.propTypes = {
  name: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
  validateOnChange: PropTypes.bool,
};

MultiField.defaultProps = {
  validateOnChange: true,
};
