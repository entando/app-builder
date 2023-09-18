import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Button, Row, Col, FormGroup } from 'patternfly-react';
import { required } from '@entando/utils';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import UserProfileField, { CompositeField } from 'ui/user-profile/common/UserProfileField';
import FormLabel from 'ui/common/form/FormLabel';
import RenderListField from 'ui/common/formik-field/RenderListField';
import { BOOLEAN_OPTIONS, THREE_STATE_OPTIONS, getTranslatedOptions } from 'ui/users/common/const';
import {
  TYPE_BOOLEAN, TYPE_THREESTATE, TYPE_ENUMERATOR, TYPE_ENUMERATOR_MAP, TYPE_MONOLIST, TYPE_LIST,
  TYPE_COMPOSITE,
} from 'state/data-types/const';
import { TEST_ID_USER_PROFILE_FORM } from 'ui/test-const/user-test-const';
import { withFormik, Field, FieldArray } from 'formik';
import SelectInput from 'ui/common/formik-field/SelectInput';
import { RenderTextInputBody } from 'ui/common/formik-field/RenderTextInput';

export const matchRegex = (regex, customErrorId) => val => ((val && regex && !regex.test(val)) ?
  (<FormattedMessage id={customErrorId || 'validateForm.regex'} values={{ regex }} />) : undefined);

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

  render() {
    const {
      handleSubmit, invalid, submitting, defaultLanguage, languages,
      profileTypesAttributes, intl, profileTypes, onProfileTypeChange, setFieldValue,
    } = this.props;

    const renderFieldArray = (attributeCode, attribute, component, language) => (<FieldArray
      key={attributeCode}
      component={component}
      attributeType={attribute.nestedAttribute.type}
      nestedAttribute={attribute.nestedAttribute}
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
      intl={intl}
      language={language && language.code}
    />);

    const showProfileFields = (
      profileTypesAttributes.map((attribute) => {
        if (attribute.type === TYPE_COMPOSITE) {
          return (
            <CompositeField
              key={attribute.name}
              attribute={attribute}
              intl={intl}
            />
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
        return (
          <UserProfileField
            key={attribute.name}
            attribute={attribute}
            intl={intl}
          />);
      })
    );

    const typeCodeField = (
      <FormGroup>
        <Col xs={12}>
          <fieldset className="no-padding">
            <Field
              as="input"
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
              component={RenderTextInputBody}
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
      <form onSubmit={handleSubmit} className="UserForm form-horizontal" data-testid="UserProfileForm">
        <Row>
          <Col xs={10}>
            <fieldset className="no-padding">
              <div>
                <Field
                  component={SelectInput}
                  onChange={e => onProfileTypeChange(e.target.value, profileTypes, setFieldValue)}
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
              data-testid={TEST_ID_USER_PROFILE_FORM.SAVE_BUTTON}
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
  setFieldValue: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
};

UserProfileFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  onWillMount: null,
  profileTypesAttributes: [],
  profileTypes: [],
  onProfileTypeChange: () => {},
};


const UserForm = withFormik({
  form: 'UserProfile',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  mapPropsToValues: ({
    userProfileAttributes, userCurrentProfileType, username, initialValues,
  }) => {
    let attributes;
    if (userProfileAttributes && userProfileAttributes.length > 0) {
      attributes = userProfileAttributes.reduce((accumulator, item) =>
        ({ ...accumulator, [item.code]: item.value || '' }), {});
    }

    return {
      ...initialValues, id: username || '', typeCode: userCurrentProfileType || '', ...(attributes || {}),
    };
  },
  handleSubmit: (values, { props: { onSubmit } }) => {
    onSubmit(values);
  },
})(UserProfileFormBody);

export default injectIntl(UserForm);
