import React from 'react';
import { FormattedMessage } from 'react-intl';

export const required = value =>
  (value ? undefined : <FormattedMessage id="fcc.validateForm.required" />);

export const maxLength = max => value =>
  (value && value.length > max ?
    <FormattedMessage
      id="fcc.validateForm.maxLength"
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
    <FormattedMessage id="fcc.validateForm.number" /> : undefined);

export const minValue = min => value =>
  (Number.IsNan(value) && value < min ?
    <FormattedMessage
      id="fcc.validateForm.minValue"
      values={{ min: <b>{min}</b> }}
    /> : undefined);

export const maxValue = max => value =>
  (Number.IsNan(value) && value > max ?
    <FormattedMessage
      id="fcc.validateForm.maxValue"
      values={{ max: <b>{max}</b> }}
    /> : undefined);

export const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? <FormattedMessage id="fcc.validateForm.email" /> : undefined);

export const alphaNumeric = value =>
  (value && /[^a-zA-Z0-9 ]/i.test(value) ?
    <FormattedMessage id="fcc.validateForm.alphaNumeric" /> : undefined);

export const phoneNumber = value =>
  (value && !/^(0|[1-9][0-9]{9})$/i.test(value) ?
    <FormattedMessage id="fcc.validateForm.phoneNumber" /> : undefined);

export const widgetCode = value =>
  (value && /[^a-zA-Z0-9_]/i.test(value) ?
    <FormattedMessage
      id="fcc.validateForm.widgetCode"
      values={{ name: <b>{value}</b> }}
    /> : undefined);
