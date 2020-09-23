import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import RegexParser from 'regex-parser';
import { reduxForm, Field, FieldArray, FormSection } from 'redux-form';
import { Button, Row, Col, FormGroup } from 'patternfly-react';
import { required, minLength, maxLength, minValue, maxValue } from '@entando/utils';
import Panel from 'react-bootstrap/lib/Panel';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import { getComponentType } from 'helpers/entities';

import FormLabel from 'ui/common/form/FormLabel';
import RenderListField from 'ui/common/form/RenderListField';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import { BOOLEAN_OPTIONS, THREE_STATE_OPTIONS, getTranslatedOptions } from 'ui/users/common/const';
import {
  TYPE_BOOLEAN, TYPE_THREESTATE, TYPE_ENUMERATOR, TYPE_ENUMERATOR_MAP, TYPE_MONOLIST, TYPE_LIST,
  TYPE_COMPOSITE,
} from 'state/data-types/const';

export const matchRegex = regex => val => ((val && regex && !regex.test(val)) ?
  (<FormattedMessage id="validateForm.regex" values={{ regex }} />) : undefined);

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

const msgs = defineMessages({
  enumNone: {
    id: 'app.enumerator.none',
    defaultMessage: 'None',
  },
});

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

export class UserProfileFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  componentWillUnmount() {
    this.props.onWillUnmount();
  }

  generateValidatorFunc(value, validatorFuncName, validatorFunc, validatorArray, parseValueFunc) {
    if (value === null || value === undefined) return;
    const parsedValue = parseValueFunc ? parseValueFunc(value) : value;
    if (this.validatorFuncName) {
      if (!this.validatorFuncName[value]) {
        this.validatorFuncName = { ...this.validatorFuncName, [value]: validatorFunc(parsedValue) };
      }
    } else {
      this.validatorFuncName = { [value]: validatorFunc(parsedValue) };
    }
    validatorArray.push(this.validatorFuncName[value]);
  }

  renderField(attribute) {
    const { intl } = this.props;
    const { validationRules } = attribute || {};
    const {
      minLength: textMinLen, maxLength: textMaxLen, regex, rangeEndNumber, rangeStartNumber,
    } = validationRules || {};
    const validateArray = [...(attribute.mandatory ? [required] : [])];

    this.generateValidatorFunc(textMinLen, 'minLength', minLength, validateArray);
    this.generateValidatorFunc(textMaxLen, 'maxLength', maxLength, validateArray);
    this.generateValidatorFunc(regex, 'regex', matchRegex, validateArray, RegexParser);
    this.generateValidatorFunc(rangeEndNumber, 'rangeEndNumber', maxValue, validateArray);
    this.generateValidatorFunc(rangeStartNumber, 'rangeStartNumber', minValue, validateArray);

    return (<Field
      key={attribute.code}
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
      validate={validateArray}
    />);
  }

  renderCompositeAttribute(compositeAttributes) {
    return compositeAttributes.map(attribute => this.renderField(attribute));
  }

  render() {
    const {
      onSubmit, handleSubmit, invalid, submitting, defaultLanguage, languages,
      profileTypesAttributes, intl, profileTypes, onProfileTypeChange,
    } = this.props;

    const renderFieldArray = (attributeCode, attribute, component, language) => (<FieldArray
      key={attributeCode}
      component={component}
      attributeType={attribute.nestedAttribute.type}
      name={attributeCode}
      rows={3}
      toggleElement={getComponentOptions(attribute.type, intl)}
      options={getEnumeratorOptions(
            attribute.nestedAttribute.type,
            attribute.nestedAttribute.enumeratorStaticItems,
            attribute.nestedAttribute.enumeratorStaticItemsSeparator,
            attribute.nestedAttribute.mandatory,
            intl,
          )}
      optionValue="value"
      optionDisplayName="optionDisplayName"
      label={<FormLabel
        labelText={language ? `${attribute.name} (${language.name})` : attribute.name}
        helpText={getHelpMessage(attribute.validationRules, intl)}
        required={attribute.mandatory}
      />}
      defaultLanguage={defaultLanguage}
      languages={languages}
      language={language && language.code}
    />);

    const showProfileFields = (
      profileTypesAttributes.map((attribute) => {
        if (attribute.type === TYPE_COMPOSITE) {
          return (
            <Row key={attribute.code}>
              <label className="control-label col-xs-2">
                <FormLabel
                  labelText={attribute.name}
                  helpText={getHelpMessage(attribute.validationRules, intl)}
                  required={attribute.mandatory}
                />
              </label>
              <Col xs={10}>
                <Panel>
                  <Panel.Body>
                    <FormSection name={attribute.code}>
                      { this.renderCompositeAttribute(attribute.compositeAttributes)}
                    </FormSection>
                  </Panel.Body>
                </Panel>
              </Col>
            </Row>
          );
        }
        if (attribute.type === TYPE_LIST) {
          return languages.map(lang => (
            <div key={lang.code}>
              {renderFieldArray(`${attribute.code}.${lang.code}`, attribute, RenderListField, lang)}
            </div>
          ));
        }
        if (attribute.type === TYPE_MONOLIST) {
          return (
            <Row key={attribute.code}>
              <Col xs={12}>
                {renderFieldArray(attribute.code, attribute, RenderListField)}
              </Col>
            </Row>
          );
        }
        return this.renderField(attribute);
      })
    );

    const typeCodeField = (
      <FormGroup>
        <Col xs={12}>
          <fieldset className="no-padding">
            <Field
              component="input"
              type="hidden"
              name="typeCode"
              disabled
              label={<FormLabel
                labelId="userProfile.typeCode"
              />}
            />
          </fieldset>
        </Col>
      </FormGroup>
    );

    const usernameField = (
      <FormGroup>
        <Col xs={12}>
          <fieldset className="no-padding">
            <Field
              key="id"
              component={RenderTextInput}
              name="id"
              disabled
              label={<FormLabel
                labelId="user.table.username"
                required
              />}
            />
          </fieldset>
        </Col>
      </FormGroup>
    );

    return (
      <form onSubmit={handleSubmit(onSubmit.bind(this))} className="UserForm form-horizontal">
        <Row>
          <Col xs={10}>
            <fieldset className="no-padding">
              <div>
                <Field
                  component={RenderSelectInput}
                  onChange={e => onProfileTypeChange(e.target.value, profileTypes)}
                  options={profileTypes}
                  defaultOptionId="form.select.chooseOne"
                  label={<FormLabel labelId="user.profileType" required />}
                  name="typeCode"
                  validate={[required]}
                />
              </div>
              <hr />
              {typeCodeField}
              {usernameField}
              {showProfileFields}
            </fieldset>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={10}>
            <Button
              className="pull-right"
              type="submit"
              bsStyle="primary"
              disabled={invalid || submitting}
            >
              <FormattedMessage id="app.save" />
            </Button>
          </Col>
        </Row>
      </form>
    );
  }
}

UserProfileFormBody.propTypes = {
  intl: intlShape.isRequired,
  onWillMount: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  defaultLanguage: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  profileTypesAttributes: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
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
    nestedAttribute: PropTypes.shape({
      type: PropTypes.string,
    }),
    compositeAttributes: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string,
      enumeratorStaticItems: PropTypes.string,
      enumeratorStaticItemsSeparator: PropTypes.string,
      mandatory: PropTypes.bool,
      name: PropTypes.string,
      type: PropTypes.string,
    })),
  })),
  profileTypes: PropTypes.arrayOf(PropTypes.shape({})),
  onProfileTypeChange: PropTypes.func,
  onWillUnmount: PropTypes.func,
};

UserProfileFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  onWillMount: null,
  profileTypesAttributes: [],
  profileTypes: [],
  onProfileTypeChange: () => {},
  onWillUnmount: () => {},
};


const UserForm = reduxForm({
  form: 'UserProfile',
})(UserProfileFormBody);

export default injectIntl(UserForm);
