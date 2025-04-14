import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Row, Col } from 'patternfly-react';
import { FormattedMessage, defineMessages, intlShape } from 'react-intl';
import { required, minLength, maxLength, minValue, maxValue } from '@entando/utils';
import Panel from 'react-bootstrap/lib/Panel';
import { Field, FieldArray } from 'formik';
import RegexParser from 'regex-parser';
import { BOOLEAN_OPTIONS, THREE_STATE_OPTIONS, getTranslatedOptions } from 'ui/users/common/const';
import { TYPE_BOOLEAN, TYPE_THREESTATE, TYPE_ENUMERATOR, TYPE_ENUMERATOR_MAP } from 'state/data-types/const';
import { getComponentType } from 'helpers/formikEntities';
import FormLabel from 'ui/common/form/FormLabel';

const readOnlyFields = ['profilepicture'];

const msgs = defineMessages({
  enumNone: {
    id: 'app.enumerator.none',
    defaultMessage: 'None',
  },
});

export const matchRegex = (regex, customErrorId) => val => ((val && regex && !regex.test(val)) ?
  (<FormattedMessage id={customErrorId || 'validateForm.regex'} values={{ regex }} />) : undefined);

const getHelpMessage = (validationRules, intl) => {
  if (validationRules) {
    const key = get(validationRules, 'ognlValidation.keyForHelpMessage');
    const msgKey = defineMessages({
      label: { id: key },
    });
    return key ? intl.formatMessage(msgKey.label) : get(validationRules, 'ognlValidation.helpMessage');
  }
  return null;
};

const getComponentOptions = (component, intl) => {
  const booleanOptions = getTranslatedOptions(intl, BOOLEAN_OPTIONS);
  const threeStateOptions = getTranslatedOptions(intl, THREE_STATE_OPTIONS);
  switch (component) {
    case TYPE_BOOLEAN:
      return booleanOptions;
    case TYPE_THREESTATE:
      return threeStateOptions;
    default: return null;
  }
};

const getEnumeratorOptions = (component, items, separator, mandatory, intl) => {
  const options = [];
  if (mandatory === false) {
    options.push({ value: '', optionDisplayName: intl.formatMessage(msgs.enumNone) });
  }
  switch (component) {
    case TYPE_ENUMERATOR:
    { const itemsList = items.split(separator);
      itemsList.forEach((item) => {
        options.push({ optionDisplayName: item, value: item });
      });
      return options;
    }
    case TYPE_ENUMERATOR_MAP: {
      const itemsList = items.split(separator);
      itemsList.forEach((item) => {
        const [itemKey, itemValue] = item.split('=');
        options.push({ optionDisplayName: itemKey.trim(), value: itemValue.trim() });
      });
      return options;
    }
    default: return null;
  }
};

export const generateValidatorFunc = (
  value, validatorFuncName, validatorFunc,
  validatorArray, parseValueFunc, customErrorId,
) => {
  const userProfileValidators = {};
  if (value === null || value === undefined) {
    return;
  }
  const parsedValue = parseValueFunc ? parseValueFunc(value) : value;
  if (!userProfileValidators[validatorFuncName]) {
    userProfileValidators[validatorFuncName] = {};
  }
  if (!userProfileValidators[validatorFuncName][value]) {
    userProfileValidators[validatorFuncName] = {
      ...userProfileValidators[validatorFuncName],
      [value]: validatorFunc(parsedValue, customErrorId),
    };
  }
  validatorArray.push(userProfileValidators[validatorFuncName][value]);
};

export const UserProfileField = ({
  attribute, intl, setFieldValue, disabled,
}) => {
  const { validationRules } = attribute || {};
  const {
    minLength: textMinLen, maxLength: textMaxLen, regex, rangeEndNumber, rangeStartNumber,
  } = validationRules || {};

  const vArray = useMemo(() => {
    const validateArray = [...(attribute.mandatory ? [required] : [])];
    generateValidatorFunc(textMinLen, 'minLength', minLength, validateArray);
    generateValidatorFunc(textMaxLen, 'maxLength', maxLength, validateArray);
    generateValidatorFunc(
      regex, 'regex', matchRegex, validateArray, RegexParser,
      attribute.type === 'Email' && 'validateForm.email',
    );
    generateValidatorFunc(rangeEndNumber, 'rangeEndNumber', maxValue, validateArray);
    generateValidatorFunc(rangeStartNumber, 'rangeStartNumber', minValue, validateArray);
    return validateArray;
  }, [attribute.mandatory, attribute.type, rangeEndNumber, rangeStartNumber,
    regex, textMaxLen, textMinLen]);

  const validationFunc = (value, validationFuncList) => {
    let validation = null;
    validationFuncList.forEach((func) => {
      const validate = func(value);
      if (validate) validation = validate;
    });
    return validation;
  };

  return (<Field
    component={getComponentType(attribute.type)}
    name={attribute.code}
    rows={3}
    toggleElement={getComponentOptions(attribute.type, intl)}
    options={getEnumeratorOptions(
      attribute.type,
      attribute.enumeratorStaticItems,
      attribute.enumeratorStaticItemsSeparator,
      attribute.mandatory,
      intl,
    )}
    optionValue="value"
    optionDisplayName="optionDisplayName"
    label={<FormLabel
      labelText={attribute.name}
      helpText={getHelpMessage(attribute.validationRules, intl)}
      required={attribute.mandatory}
    />}
    validate={value => validationFunc(value, vArray)}
    readOnly={readOnlyFields.includes(attribute.code)}
    data-testid={`UserProfileForm__${attribute.code}Field`}
    onPickDate={value => setFieldValue(attribute.code, value)}
    disabled={disabled}
  />);
};

const basicAttributeShape = PropTypes.shape({
  type: PropTypes.string,
  mandatory: PropTypes.bool,
  code: PropTypes.string,
  name: PropTypes.string,
  enumeratorStaticItems: PropTypes.string,
  enumeratorStaticItemsSeparator: PropTypes.string,
  validationRules: PropTypes.shape({
    ognlValidation: PropTypes.shape({
      helpMessage: PropTypes.string,
      keyForHelpMessage: PropTypes.string,
    }),
  }),
});

UserProfileField.propTypes = {
  attribute: basicAttributeShape.isRequired,
  intl: intlShape.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

UserProfileField.defaultProps = {
  disabled: false,
};

export const CompositeField = ({
  attribute,
  intl,
  fieldName,
  noLabel,
}) => {
  const renderWithPanel = body => (
    noLabel ? body : <Panel><Panel.Body>{body}</Panel.Body></Panel>
  );
  const compositeFieldName = fieldName || attribute.code;
  return (
    <Row key={attribute.code}>
      {!noLabel && (
        <label className="control-label col-xs-2">
          <FormLabel
            labelText={attribute.name}
            helpText={getHelpMessage(attribute.validationRules, intl)}
            required={attribute.mandatory}
          />
        </label>
      )}
      <Col xs={noLabel ? 12 : 10}>
        {renderWithPanel((
          <FieldArray name={compositeFieldName}>
            { attribute.compositeAttributes.map(attr => (
              <UserProfileField key={`${compositeFieldName}.${attr.code}`} attribute={attr} intl={intl} />
            ))}
          </FieldArray>
        ))}
      </Col>
    </Row>
  );
};

CompositeField.propTypes = {
  attribute: PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
    mandatory: PropTypes.bool,
    enumeratorStaticItems: PropTypes.string,
    enumeratorStaticItemsSeparator: PropTypes.string,
    validationRules: PropTypes.shape({
      ognlValidation: PropTypes.shape({
        helpMessage: PropTypes.string,
        keyForHelpMessage: PropTypes.string,
      }),
    }),
    compositeAttributes: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string,
      enumeratorStaticItems: PropTypes.string,
      enumeratorStaticItemsSeparator: PropTypes.string,
      mandatory: PropTypes.bool,
      name: PropTypes.string,
      type: PropTypes.string,
    })),
  }).isRequired,
  intl: intlShape.isRequired,
  fieldName: PropTypes.string,
  noLabel: PropTypes.bool,
};

CompositeField.defaultProps = {
  fieldName: '',
  noLabel: false,
};
