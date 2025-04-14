import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { withFormik, FieldArray } from 'formik';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Panel } from 'react-bootstrap';
import { Form, Button, Row, Col } from 'patternfly-react';
import { required, email } from '@entando/utils';
import RenderListField from 'ui/common/formik-field/RenderListField';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import FormLabel from 'ui/common/form/FormLabel';
import { BOOLEAN_OPTIONS, THREE_STATE_OPTIONS, getTranslatedOptions } from 'ui/users/common/const';
import ProfileImageUploader from 'ui/users/common/ProfileImageUploader';
import {
  TYPE_BOOLEAN, TYPE_THREESTATE, TYPE_ENUMERATOR, TYPE_ENUMERATOR_MAP, TYPE_MONOLIST, TYPE_LIST,
  TYPE_COMPOSITE,
} from 'state/data-types/const';
import { UserProfileField } from 'ui/user-profile/common/UserProfileField';

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
    {
      const itemsList = items.split(separator);
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

class MyProfileEditFormBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
    };

    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }

  componentDidMount() {
    this.props.onMount(this.props.username);
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

  changeMode() {
    this.setState({
      editMode: false,
    });
  }

  render() {
    const {
      profileTypesAttributes, defaultLanguage, languages, intl, userEmail, onChangeProfilePicture,
      handleSubmit, setFieldValue, isValid, resetForm, values, isSubmitting,
    } = this.props;

    const { editMode } = this.state;

    const field = (attribute, disabled) => (
      <UserProfileField
        key={attribute.code}
        attribute={attribute}
        intl={intl}
        disabled={disabled}
      />
    );

    const renderCompositeAttribute = (compositeAttributes, disabled) =>
      compositeAttributes.map(attribute => field(attribute, disabled));

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

    const renderedProfileFields = profileTypesAttributes
      .filter(attribute => attribute.code !== 'profilepicture')
      .map((attribute) => {
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
                    <div name={attribute.code}>
                      {renderCompositeAttribute(attribute.compositeAttributes, !editMode)}
                    </div>
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
        return field(attribute, !editMode);
      });

    const { profilepicture } = values;

    return (
      <Form horizontal className="MyProfileEditForm">
        <FormSectionTitle titleId="user.myProfile.uploadImage" requireFields={false} />
        <input type="hidden" name="profilepicture" />
        <ProfileImageUploader
          image={profilepicture}
          onChange={(e) => {
            onChangeProfilePicture(setFieldValue, e);
          }}
          gravatarEmail={userEmail}
          editable={editMode}
        />

        <div className="MyProfileEditForm__attributes">
          <FormSectionTitle titleId="user.myProfile.editProfileSection" />
          {renderedProfileFields}
        </div>

        {editMode ? (
          <Fragment>
            <Button
              className="pull-right"
              type="submit"
              bsStyle="primary"
              disabled={!isValid || isSubmitting}
              data-testid="profile_saveBtn"
              onClick={() => {
                this.changeMode();
                handleSubmit();
              }}
            >
              <FormattedMessage id="app.save" />
            </Button>
            <Button
              className="pull-right"
              onClick={() => {
                this.handleCancelClick();
                resetForm();
              }}
              style={{ marginRight: '12px' }}
              data-testid="profile_cancelBtn"
            >
              <FormattedMessage id="app.cancel" />
            </Button>
          </Fragment>
        ) : (
          <Button
            className="pull-right"
            bsStyle="primary"
            onClick={this.handleEditClick}
            data-testid="profile_editBtn"
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
  resetForm: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  values: PropTypes.shape({
    profilepicture: PropTypes.string,
  }),
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
  userEmail: PropTypes.string,
  onChangeProfilePicture: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

MyProfileEditFormBody.defaultProps = {
  profileTypesAttributes: [],
  userEmail: undefined,
  values: {},
};

const MyProfileEditForm = withFormik({
  mapPropsToValues: ({ initialValues }) => initialValues,
  validate: (values) => {
    const errors = {};
    if (required(values.fullname)) {
      errors.fullname = <FormattedMessage id="validateForm.required" />;
    }
    if (required(values.email)) {
      errors.email = <FormattedMessage id="validateForm.required" />;
    }
    if (email(values.email)) {
      errors.email = <FormattedMessage id="validateForm.email" />;
    }
    return errors;
  },
  enableReinitialize: true,
  handleSubmit(values, { props }) {
    const { onSubmit } = props;
    onSubmit(values);
  },
  optionDisplayName: 'optionDisplayName',
})(injectIntl(MyProfileEditFormBody));

export default MyProfileEditForm;
