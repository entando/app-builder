// eslint-disable-next-line import/prefer-default-export
export const validateJson = (value, yupProps) => {
  const { createError, path } = yupProps;
  try {
    JSON.parse(value);
    return true;
  } catch (e) {
    return createError({
      message: `Invalid JSON format: ${e.message}`,
      path,
    });
  }
};

export const validateCodeField = intl => (value, { createError, path }) => (
  value && /^[0-9a-zA-Z_.]+$/i.test(value) ?
    true :
    createError({
      message: intl.formatMessage({ id: 'validateForm.code' }),
      path,
    })
);
