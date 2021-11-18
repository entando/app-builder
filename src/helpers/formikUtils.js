import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';

export const getTouchErrorByField = (fieldName, { touched, errors }) => ({
  touched: touched[fieldName],
  error: errors[fieldName],
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

MultiField.propTypes = {
  name: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
  validateOnChange: PropTypes.bool,
};

MultiField.defaultProps = {
  validateOnChange: true,
};
