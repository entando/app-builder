import React from 'react';
import { FormattedMessage } from 'react-intl';

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

export const validateFragmentCodeField = intl => (value, { createError, path }) => (
  value && /^[0-9a-zA-Z_\-.]+$/i.test(value) ?
    true :
    createError({
      message: intl.formatMessage({ id: 'validateForm.fragmentCode' }),
      path,
    })
);
export const userPassCharsValid = (value, { createError, path }) => {
  if (!/^[0-9a-zA-Z_.]+$/i.test(value)) {
    return createError({
      message: <FormattedMessage id="user.validate.text" />,
      path,
    });
  }

  return true;
};

// eslint-disable-next-line no-control-regex
const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

export const emailValid = (value, { createError, path }) => {
  if (!emailRegex.test(value)) {
    return createError({
      message: <FormattedMessage id="validateForm.email" />,
      path,
    });
  }

  return true;
};
