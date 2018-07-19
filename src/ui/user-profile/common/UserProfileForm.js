import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { reduxForm, Field, FieldArray, FormSection } from 'redux-form';
import { Button, Row, Col, FormGroup } from 'patternfly-react';
import Panel from 'react-bootstrap/lib/Panel';
import { formattedText } from '@entando/utils';
import { FormattedMessage } from 'react-intl';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import { getComponentType } from 'helpers/entities';

import FormLabel from 'ui/common/form/FormLabel';
import RenderListField from 'ui/common/form/RenderListField';
import { BOOLEAN_OPTIONS, THREE_STATE_OPTIONS } from 'ui/users/common/const';


const getComponentOptions = (component) => {
  switch (component) {
    case 'Boolean':
      return BOOLEAN_OPTIONS;
    case 'ThreeState':
      return THREE_STATE_OPTIONS;
    default: return null;
  }
};

const getEnumeratorOptions = (component, items, separator, mandatory) => {
  const options = [];
  if (mandatory === false) {
    options.push({ value: '', optionDisplayName: formattedText('app.enumerator.none') });
  }
  switch (component) {
    case 'Enumerator':
    { const itemsList = items.split(separator);
      itemsList.forEach((item) => {
        options.push({ optionDisplayName: item, value: item });
      });
      return options;
    }
    case 'EnumeratorMap': {
      const itemsList = items.split(separator);
      itemsList.forEach((item) => {
        const itemKey = item.split('=')[0].trim();
        const itemValue = item.split('=')[1].trim();
        options.push({ optionDisplayName: itemKey, value: itemValue });
      });
      return options;
    }
    default: return null;
  }
};

const getHelpMessage = (validationRules) => {
  if (validationRules) {
    const key = get(validationRules, 'ognlValidation.keyForHelpMessage');
    return key ? formattedText(key) : get(validationRules, 'ognlValidation.helpMessage');
  }
  return null;
};

const field = attribute => (<Field
  key={attribute.code}
  component={getComponentType(attribute.type)}
  name={attribute.code}
  rows={3}
  toggleElement={getComponentOptions(attribute.type)}
  options={getEnumeratorOptions(
    attribute.type,
    attribute.enumeratorStaticItems,
    attribute.enumeratorStaticItemsSeparator,
    attribute.mandatory,
  )}
  optionValue="value"
  optionDisplayName="optionDisplayName"
  label={<FormLabel
    labelText={attribute.name}
    helpText={getHelpMessage(attribute.validationRules)}
    required={attribute.mandatory}
  />}
/>);

const renderCompositeAttribute = compositeAttributes =>
  compositeAttributes.map(attribute => field(attribute));


export class UserProfileFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const {
      onSubmit, handleSubmit, invalid, submitting, defaultLanguage, languages,
      profileTypesAttributes,
    } = this.props;

    const renderFieldArray = (attributeCode, attribute, component, language) => (<FieldArray
      key={attributeCode}
      component={component}
      attributeType={attribute.nestedAttribute.type}
      name={attributeCode}
      rows={3}
      toggleElement={getComponentOptions(attribute.type)}
      options={getEnumeratorOptions(
            attribute.nestedAttribute.type,
            attribute.nestedAttribute.enumeratorStaticItems,
            attribute.nestedAttribute.enumeratorStaticItemsSeparator,
            attribute.nestedAttribute.mandatory,
          )}
      optionValue="value"
      optionDisplayName="optionDisplayName"
      label={<FormLabel
        labelText={language ? `${attribute.name} (${language.name})` : attribute.name}
        helpText={getHelpMessage(attribute.validationRules)}
        required={attribute.mandatory}
      />}
      defaultLanguage={defaultLanguage}
      languages={languages}
      language={language && language.code}
    />);

    const showProfileFields = (
      profileTypesAttributes.map((attribute) => {
        if (attribute.type === 'Composite') {
          return (
            <Row key={attribute.code}>
              <label className="control-label col-xs-2">
                <FormLabel
                  labelText={attribute.name}
                  helpText={getHelpMessage(attribute.validationRules)}
                  required={attribute.mandatory}
                />
              </label>
              <Col xs={10}>
                <Panel>
                  <Panel.Body>
                    <FormSection name={attribute.code}>
                      { renderCompositeAttribute(attribute.compositeAttributes)}
                    </FormSection>
                  </Panel.Body>
                </Panel>
              </Col>
            </Row>
          );
        }
        if (attribute.type === 'List') {
          return languages.map(lang => (
            <div key={lang.code}>
              {renderFieldArray(`${attribute.code}.${lang.code}`, attribute, RenderListField, lang)}
            </div>
          ));
        }
        if (attribute.type === 'Monolist') {
          return (
            <Row key={attribute.code}>
              <Col xs={12}>
                {renderFieldArray(attribute.code, attribute, RenderListField)}
              </Col>
            </Row>
          );
        }
        return field(attribute);
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
};

UserProfileFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  onWillMount: null,
  profileTypesAttributes: [],
};


const UserForm = reduxForm({
  form: 'UserProfile',
})(UserProfileFormBody);

export default UserForm;
