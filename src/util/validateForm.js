import React from 'react';
import { FormattedMessage } from 'react-intl';

export const required = value =>
  (value ? undefined : <FormattedMessage id="validateForm.required" />);

export const maxLength = max => value =>
  (value && value.length > max ?
    <FormattedMessage
      id="validateForm.maxLength"
      values={{ max: <b>{max}</b> }}
    /> : undefined);

export const minLength = min => value =>
  (value && value.length < min ?
    <FormattedMessage
      id="fcc.validateForm.minLength"
      values={{ min: <b>{min}</b> }}
    /> : undefined);

export const number = value =>
  (Number.IsNan(value) ?
    <FormattedMessage id="validateForm.number" /> : undefined);

export const minValue = min => value =>
  (Number.IsNan(value) && value < min ?
    <FormattedMessage
      id="validateForm.minValue"
      values={{ min: <b>{min}</b> }}
    /> : undefined);

export const maxValue = max => value =>
  (Number.IsNan(value) && value > max ?
    <FormattedMessage
      id="validateForm.maxValue"
      values={{ max: <b>{max}</b> }}
    /> : undefined);

export const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? <FormattedMessage id="validateForm.email" /> : undefined);

export const alphaNumeric = value =>
  (value && /[^a-zA-Z0-9 ]/i.test(value) ?
    <FormattedMessage id="validateForm.alphaNumeric" /> : undefined);

export const phoneNumber = value =>
  (value && !/^(0|[1-9][0-9]{9})$/i.test(value) ?
    <FormattedMessage id="validateForm.phoneNumber" /> : undefined);

export const widgetCode = value =>
  (value && /[^a-zA-Z0-9_]/i.test(value) ?
    <FormattedMessage
      id="validateForm.widgetCode"
      values={{ name: <b>{value}</b> }}
    /> : undefined);
