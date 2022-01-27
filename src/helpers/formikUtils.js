import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import { get } from 'lodash';

export const getTouchErrorByField = (fieldName, { touched, errors }) => ({
  touched: get(touched, fieldName, ''),
  error: get(errors, fieldName, ''),
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
