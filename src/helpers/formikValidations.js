export const formatMessageRequired = {
  id: 'validateForm.required',
  defaultMessage: 'Required',
};

export const formatMessageMaxLength = {
  id: 'validateForm.maxLength',
  defaultMessage: 'Maximum of {max} characters only.',
};

export const validateJson = intl => (value, yupProps) => {
  const { createError, path } = yupProps;
  try {
    JSON.parse(value);
    return true;
  } catch ({ message: msg }) {
    return createError({
      message: intl.formatMessage({ id: 'validateForm.invalidJson' }, { msg }),
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
