import React from 'react';
import { FormattedMessage } from 'react-intl';
import { memoize, isNull, isBoolean } from 'lodash';
import { maxLength, minLength } from '@entando/utils';

export const EMPTY_SYMBOLIC_DEST = '#!!#';

const number = value => !Number.isNaN(parseFloat(value));

const revDateFormat = dateStr => dateStr.split('/').reverse().join('/');

export const equalDate = (dateStr) => {
  const date = new Date(dateStr);
  return value => (
    (dateStr && value && new Date(revDateFormat(value)).getTime() !== date.getTime())
      ? (
        <FormattedMessage
          id="validateForm.equalDate"
          values={{ date: <b>{dateStr}</b> }}
          defaultMessage="Must be equal to {date}"
        />
      ) : undefined
  );
};

export const equalNumber = num => value => (
  number(value) && parseFloat(value) !== num
    ? (
      <FormattedMessage
        id="validateForm.equalNumber"
        values={{ num: <b>{num}</b> }}
        defaultMessage="Must be equal to {num}"
      />
    ) : undefined
);

export const equalString = str => value => (
  value !== str
    ? (
      <FormattedMessage
        id="validateForm.rangeEqualString"
        values={{ str: <b>{str}</b> }}
        defaultMessage="Must be equal to {str}"
      />
    ) : undefined
);

export const rangeEndDate = (dateStr) => {
  const date = new Date(dateStr);
  return value => (
    (dateStr && value && new Date(revDateFormat(value)) > date)
      ? (
        <FormattedMessage
          id="validateForm.rangeEndDate"
          values={{ date: <b>{dateStr}</b> }}
          defaultMessage="Must be equal to or before {date}"
        />
      ) : undefined
  );
};

export const rangeEndNumber = num => value => (
  number(value) && parseFloat(value) > num
    ? (
      <FormattedMessage
        id="validateForm.rangeEndNumber"
        values={{ num: <b>{num}</b> }}
        defaultMessage="Must be equal to or less than {num}"
      />
    ) : undefined
);

export const rangeEndString = str => value => (
  value > str
    ? (
      <FormattedMessage
        id="validateForm.rangeEndString"
        values={{ str: <b>{str}</b> }}
        defaultMessage="Must be before {str}"
      />
    ) : undefined
);

export const rangeStartDate = (dateStr) => {
  const date = new Date(dateStr);
  return value => (
    (dateStr && value && new Date(revDateFormat(value)) < date)
      ? (
        <FormattedMessage
          id="validateForm.rangeStartDate"
          values={{ date: <b>{dateStr}</b> }}
          defaultMessage="Must be after {date}"
        />
      ) : undefined
  );
};

export const rangeStartNumber = num => value => (
  number(value) && parseFloat(value) < num
    ? (
      <FormattedMessage
        id="validateForm.rangeStartNumber"
        values={{ num: <b>{num}</b> }}
        defaultMessage="Must be equal to or more than {num}"
      />
    ) : undefined
);

export const noTagsOnly = memoize(value => (
  value.replace(/(<([^>]+)>)/gi, '') !== ''
    ? undefined
    : <FormattedMessage id="validateForm.required" />
));

export const compositeOneOfExists = memoize(defaultLangCode => compositeFieldValues => (
  compositeFieldValues && compositeFieldValues.some(fieldValue => (
    (
      !isNull(fieldValue.value)
      && (
        isBoolean(fieldValue.value)
        || fieldValue.value
      )
    ) || (
      fieldValue.values && fieldValue.values[defaultLangCode]
        && !isNull(fieldValue.values[defaultLangCode])
        && (
          isBoolean(fieldValue.values[defaultLangCode])
          || fieldValue.values[defaultLangCode]
        )
    )
  )) ? undefined : <FormattedMessage id="validateForm.required" />
));

export const rangeStartString = str => value => (
  value < str
    ? (
      <FormattedMessage
        id="validateForm.rangeStartString"
        values={{ str: <b>{str}</b> }}
        defaultMessage="Must be after {str}"
      />
    ) : undefined
);

export const regex = text => (value) => {
  const re = new RegExp(text);
  return !re.test(value)
    ? (
      <FormattedMessage
        id="validateForm.regex"
        values={{ regex: <b>{text}</b> }}
        defaultMessage="Must match regular expression {regex}"
      />
    ) : undefined;
};

// Attribute validator functions should be memoized as their parameters are dynamic.
// Otherwise, it will cause an infinite re-rendering of a redux-form Field
export const attrValidatorsObj = {
  equalDate: memoize(equalDate),
  equalNumber: memoize(equalNumber),
  equalString: memoize(equalString),
  maxLength: memoize(maxLength),
  minLength: memoize(minLength),
  rangeEndDate: memoize(rangeEndDate),
  rangeEndNumber: memoize(rangeEndNumber),
  rangeEndString: memoize(rangeEndString),
  rangeStartDate: memoize(rangeStartDate),
  rangeStartNumber: memoize(rangeStartNumber),
  rangeStartString: memoize(rangeStartString),
  regex: memoize(regex),
};

export const getAttrValidators = (validationRules) => {
  const validators = [];
  Object.keys(validationRules).forEach((key) => {
    if (
      validationRules[key] !== null
      && validationRules[key] !== false
      && attrValidatorsObj[key]
    ) {
      validators.push(attrValidatorsObj[key](validationRules[key]));
    }
  });

  return validators;
};

export const linkValidate = memoize((langCode, required = false) => input => (
  (!required && (
    !input || (!input.value || (!input.value.symbolicDestination
      || input.value.symbolicDestination === EMPTY_SYMBOLIC_DEST
      || input.values[langCode]
    )))) || (
    required && input && input.value && input.value.symbolicDestination
    && input.values[langCode] && input.value.symbolicDestination !== EMPTY_SYMBOLIC_DEST
  )
    ? undefined
    : (<FormattedMessage id="validateForm.required" />)
), (...args) => JSON.stringify(args));

export const listRequired = value => (
  !value || !value.length ? <FormattedMessage id="validateForm.required" /> : undefined
);
