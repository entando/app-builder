// eslint-disable-next-line import/prefer-default-export
export const getTouchErrorByField = (fieldName, { touched, errors }) => ({
  touched: touched[fieldName],
  error: errors[fieldName],
});
