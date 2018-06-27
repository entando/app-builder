import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, FormSection } from 'redux-form';
import { Button, Row, Col, FormGroup } from 'patternfly-react';
import { formattedText } from '@entando/utils';
import { FormattedMessage } from 'react-intl';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import { getComponentType } from 'helpers/entities';

import FormLabel from 'ui/common/form/FormLabel';
import RenderListField from 'ui/common/form/RenderListField';
import { BOOLEAN_OPTIONS, THREE_STATE_OPTIONS } from 'ui/users/common/const';

// const EDIT_MODE = 'edit';
// const NEW_MODE = 'new';

// const minLength8 = minLength(8);
// const maxLength20 = maxLength(20);

export class EntityFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const {
      onSubmit, handleSubmit, invalid, submitting, defaultLanguage, languages, // mode,
    } = this.props;

    /*
      Boolean   -> ok
      CheckBox  -> ok
      Composite -> ok -> verificare tutti i tipi
      Date      -> ok
      Enumerator     -> ok
      EnumeratorMap  -> ok
      Hypertext -> ok
      List      -> ok -> verificare tutti i tipi
      Longtext  -> ok
      Monolist  -> ok -> verificare tutti i tipi
      Monotext  -> ok
      Number    -> ok
      Text      -> ok
      ThreeState -> ok
      Timestamp -> ok
    */

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
        if (validationRules.ognlValidation) {
          if (validationRules.ognlValidation.keyForHelpMessage) {
            return formattedText(validationRules.ognlValidation.keyForHelpMessage);
          }
          return validationRules.ognlValidation.helpMessage;
        }
      }
      return null;
    };

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
        labelId={attribute.name}
        helpText={getHelpMessage(attribute.validationRules)}
        required={attribute.mandatory}
      />}
      defaultLanguage={defaultLanguage}
      languages={languages}
      language={language}
    />);

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
        labelId={attribute.name}
        helpText={getHelpMessage(attribute.validationRules)}
        required={attribute.mandatory}
      />}
    />);

    const renderCompositeAttribute = compositeAttributes =>
      compositeAttributes.map(attribute => field(attribute));

    const showProfileFields = (
      this.props.profileTypesAttributes.map((attribute) => {
        if (attribute.type === 'Composite') {
          return (
            <div>
              <h2>
                <FormLabel
                  labelId={`${attribute.name}`}
                  helpText={getHelpMessage(attribute.validationRules)}
                  required={attribute.mandatory}
                />
              </h2>

              <FormSection name={attribute.code}>
                { renderCompositeAttribute(attribute.compositeAttributes)}
              </FormSection>
            </div>
          );
        }
        if (attribute.type === 'List') {
          return languages.map(lang => (
            <div>
              <h2>
                <FormLabel
                  labelId={`${attribute.name} ${lang.name}`}
                  helpText={getHelpMessage(attribute.validationRules)}
                  required={attribute.mandatory}
                />
              </h2>
              {renderFieldArray(`${attribute.code}.${lang.code}`, attribute, RenderListField, lang.code)}
            </div>
          ));
        }
        if (attribute.type === 'Monolist') {
          return renderFieldArray(attribute.code, attribute, RenderListField);
        }
        return field(attribute);
      })
    );

    const showTypeCode = (
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

    const showUsername = (
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
          <Col xs={12}>
            <fieldset className="no-padding">
              {showTypeCode}
              {showUsername}
              {showProfileFields}
            </fieldset>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
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

EntityFormBody.propTypes = {
  onWillMount: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  defaultLanguage: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  // mode: PropTypes.string,
  profileTypesAttributes: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    code: PropTypes.string,
    name: PropTypes.string,
    /* status: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string,
      descr: PropTypes.string,
    })),
    disablingCodes: PropTypes.arrayOf(PropTypes.string),
    */
    mandatory: PropTypes.bool,
    // listFilter: PropTypes.bool,
    // indexable: PropTypes.bool,
    enumeratorStaticItems: PropTypes.string,
    enumeratorStaticItemsSeparator: PropTypes.string,
    // enumeratorExtractorBean: PropTypes.string,
    validationRules: PropTypes.shape({
      ognlValidation: PropTypes.shape({
        // ognlExpression: PropTypes.string,
        // applyOnlyToFilledAttr: PropTypes.bool,
        helpMessage: PropTypes.string,
        keyForHelpMessage: PropTypes.string,
        errorMessage: PropTypes.string,
        keyForErrorMessage: PropTypes.string,
      }),
      /*
      minLength: PropTypes.number,
      maxLength: PropTypes.number,
      regex: PropTypes.string,
      rangeStartString: PropTypes.string,
      rangeEndString: PropTypes.string,
      rangeStartStringAttribute: PropTypes.string,
      rangeEndStringAttribute: PropTypes.string,
      equalString: PropTypes.string,
      equalStringAttribute: PropTypes.string,
      rangeStartDate: PropTypes.string,
      rangeEndDate: PropTypes.string,
      rangeStartDateAttribute: PropTypes.string,
      rangeEndDateAttribute: PropTypes.string,
      equalDate: PropTypes.string,
      equalDateAttribute: PropTypes.string,
      rangeStartNumber: PropTypes.number,
      rangeStartNumberAttribute: PropTypes.string,
      rangeEndNumber: PropTypes.string,
      rangeEndNumberAttribute: PropTypes.string,
      equalNumber: PropTypes.string,
      equalNumberAttribute: PropTypes.string,
      */
    }),
    nestedAttribute: PropTypes.shape({
      /*
      code: PropTypes.string,
      compositeAttributes: PropTypes.string,
      disablingCodes: [],
      enumeratorExtractorBean: null,
      enumeratorStaticItems: PropTypes.string,
      enumeratorStaticItemsSeparator: PropTypes.string,
      indexable: PropTypes.boolean,
      listFilter: PropTypes.boolean,
      mandatory: PropTypes.boolean,
      name: PropTypes.string,
      nestedAttribute: null,
      roles: [], */
      type: PropTypes.string,
    }),
    compositeAttributes: PropTypes.shape({

      code: PropTypes.string,
      // compositeAttributes: null,
      // disablingCodes: [],
      // enumeratorExtractorBean: null,
      enumeratorStaticItems: PropTypes.string,
      enumeratorStaticItemsSeparator: PropTypes.string,
      // indexable: false,
      // listFilter: false,
      mandatory: PropTypes.boolean,
      name: PropTypes.string,
      // nestedAttribute: null,
      roles: [],
      type: PropTypes.string,
      // validationRules:
      // {
      //   minLength: null,
      //   maxLength: null,
      //   regex: null,
      //   rangeStartString: null,
      //   rangeEndString: null,
      // },
      // equalDate: null,
      // equalDateAttribute: null,
      // equalNumber: null,
      // equalNumberAttribute: null,
      // equalString: null,
      // equalStringAttribute: null,
      // maxLength: null,
      // minLength: null,
      // ognlValidation: null,
      // rangeEndDate: null,
      // rangeEndDateAttribute: null,
      // rangeEndNumber: null,
      // rangeEndNumberAttribute: null,
      // rangeEndString: null,
      // rangeEndStringAttribute: null,
      // rangeStartDate: null,
      // rangeStartDateAttribute: null,
      // rangeStartNumber: null,
      // rangeStartNumberAttribute: null,
      // rangeStartString: null,
      // rangeStartStringAttribute: null,
      // regex: null,
    }),
  })),
};

EntityFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  // mode: NEW_MODE,
  onWillMount: null,
  profileTypesAttributes: [],
};

export default EntityFormBody;
