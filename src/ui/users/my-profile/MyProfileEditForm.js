import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { reduxForm, Field, FieldArray, FormSection } from 'redux-form';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Panel } from 'react-bootstrap';
import { Form, Button, Row, Col } from 'patternfly-react';

import RenderListField from 'ui/common/form/RenderListField';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import FormLabel from 'ui/common/form/FormLabel';
import { BOOLEAN_OPTIONS, THREE_STATE_OPTIONS, getTranslatedOptions } from 'ui/users/common/const';
import {
  TYPE_BOOLEAN, TYPE_THREESTATE, TYPE_ENUMERATOR, TYPE_ENUMERATOR_MAP, TYPE_MONOLIST, TYPE_LIST,
  TYPE_COMPOSITE,
} from 'state/data-types/const';
import { getComponentType } from 'helpers/entities';
import DropzoneUploader from 'ui/users/common/DropzoneUploader';

const defaultAttrCodes = ['fullname', 'email'];

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

const field = (intl, attribute, disabled) => {
  const labelProp = defaultAttrCodes.includes(attribute.code) ? ({
    labelId: `user.table.${attribute.code}`,
  }) : ({
    labelText: attribute.name,
  });

  return (
    <Field
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
        {...labelProp}
        helpText={getHelpMessage(attribute.validationRules, intl)}
        required={attribute.mandatory}
      />}
      disabled={disabled}
    />
  );
};

const renderCompositeAttribute = (intl, compositeAttributes, disabled) =>
  compositeAttributes.map(attribute => field(intl, attribute, disabled));

export class MyProfileEditFormBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
    };

    this.submit = this.submit.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  componentDidMount() {
    this.props.onMount(this.props.username);
  }

  submit(data) {
    this.setState({
      editMode: false,
    });
    this.props.onSubmit(data);
  }

  handleCancelClick() {
    const { onCancel } = this.props;
    onCancel();
    this.setState({
      editMode: false,
    });
  }

  handleEditClick() {
    this.setState({
      editMode: true,
    });
  }

  render() {
    const {
      profileTypesAttributes, defaultLanguage, languages, intl,
    } = this.props;

    const { editMode } = this.state;

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

    const renderedProfileFields = profileTypesAttributes.map((attribute) => {
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
                    { renderCompositeAttribute(intl, attribute.compositeAttributes, !editMode)}
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
      return field(intl, attribute, !editMode);
    });

    return (
      <Form onSubmit={this.props.handleSubmit(this.submit)} horizontal className="MyProfileEditForm">
        <FormSectionTitle titleId="user.myProfile.uploadImageProfile" requireFields={false} subtitle="user.myProfile.onlyImage" />
        <DropzoneUploader onUpload={files => console.log(files)} maxFiles={1} accept="image/*" />
        <FormSectionTitle titleId="user.myProfile.editProfileSection" />
        {renderedProfileFields}
        {editMode ? (
          <Fragment>
            <Button
              className="pull-right"
              type="submit"
              bsStyle="primary"
            >
              <FormattedMessage id="app.save" />
            </Button>
            <Button
              className="pull-right"
              onClick={this.handleCancelClick}
              style={{ marginRight: '12px' }}
            >
              <FormattedMessage id="app.cancel" />
            </Button>
          </Fragment>
        ) : (
          <Button
            className="pull-right"
            bsStyle="primary"
            onClick={this.handleEditClick}
          >
            <FormattedMessage id="app.edit" />
          </Button>
        )}
      </Form>
    );
  }
}

MyProfileEditFormBody.propTypes = {
  onMount: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
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
  defaultLanguage: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  intl: intlShape.isRequired,
};

MyProfileEditFormBody.defaultProps = {
  profileTypesAttributes: [],
};

const MyProfileEditForm = reduxForm({
  form: 'UserProfile',
  enableReinitialize: true,
})(MyProfileEditFormBody);

export default injectIntl(MyProfileEditForm);
