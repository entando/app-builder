import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Row, Col } from 'patternfly-react';
import { formatDate } from '@entando/utils';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import SelectInput from 'ui/common/formik-field/SelectInput';
import SwitchInput from 'ui/common/formik-field/SwitchInput';

import FormLabel from 'ui/common/form/FormLabel';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import ConfirmCancelModalContainer from 'ui/common/cancel-modal/ConfirmCancelModalContainer';
import { TEST_ID_USER_FORM } from 'ui/test-const/user-test-const';
import { userPassCharsValid } from 'helpers/formikValidations';

const msgs = defineMessages({
  username: {
    id: 'user.username',
  },
  password: {
    id: 'user.password',
  },
  passwordConfirm: {
    id: 'user.passwordConfirm',
  },
});

const renderStaticField = (fieldProps) => {
  const { field, label, name } = fieldProps;
  let fieldValue = field.value && (field.value.title || field.value);
  if (!field.value) {
    fieldValue = <i className="icon fa fa-minus" />;
  } else if (!Number.isNaN(Date.parse(fieldValue))) {
    fieldValue = formatDate(fieldValue);
  }

  return (
    <div className="form-group">
      <label htmlFor={name} className="control-label col-xs-2">
        {label}
      </label>
      <Col xs={10}>
        {fieldValue}
      </Col>
    </div>
  );
};

const addFormSchema = Yup.object().shape({
  username: Yup.string()
    .required(<FormattedMessage id="validateForm.required" />)
    .min(4, <FormattedMessage id="validateForm.minLength" values={{ min: 4 }} />)
    .max(80, <FormattedMessage id="validateForm.maxLength" values={{ max: 80 }} />)
    .test('usernameCharsValid', userPassCharsValid),
  password: Yup.string()
    .required(<FormattedMessage id="validateForm.required" />)
    .min(8, <FormattedMessage id="validateForm.minLength" values={{ min: 8 }} />)
    .max(20, <FormattedMessage id="validateForm.maxLength" values={{ max: 20 }} />)
    .test('passwordCharsValid', userPassCharsValid),
  passwordConfirm: Yup.string()
    .required(<FormattedMessage id="validateForm.required" />)
    .oneOf([Yup.ref('password')], <FormattedMessage id="validateForm.passwordNotMatch" />),
  profileType: Yup.string()
    .required(<FormattedMessage id="validateForm.required" />),
  status: Yup.string(),
});

const editFormSchema = Yup.object().shape({
  username: Yup.string(),
  password: Yup.string()
    .min(8, <FormattedMessage id="validateForm.minLength" values={{ min: 8 }} />)
    .max(20, <FormattedMessage id="validateForm.maxLength" values={{ max: 20 }} />)
    .test('passwordCharsValid', userPassCharsValid),
  passwordConfirm: Yup.string()
    .when('password', (password, field) => (password ? (field
      .required(<FormattedMessage id="validateForm.required" />)
      .oneOf([Yup.ref('password')], <FormattedMessage id="validateForm.passwordNotMatch" />)
    ) : field)),
  registration: Yup.string(),
  lastLogin: Yup.string().nullable(),
  lastPasswordChange: Yup.string().nullable(),
  reset: Yup.boolean(),
  status: Yup.string(),
});

const getFormSchema = editing => (editing ? editFormSchema : addFormSchema);

const UserForm = ({
  intl, initialValues, profileTypes, onMount, onSubmit,
  onCancel, onDiscard, onModalSave, editing,
}) => {
  useEffect(() => {
    onMount();
  }, [onMount]);

  const handleSubmit = ({ submitType, ...values }) => onSubmit(values, submitType);

  const handleCancelClick = ({ dirty }) => {
    if (dirty) {
      onCancel();
    } else {
      onDiscard();
    }
  };

  const handleModalSave = ({ submitForm }) => {
    onModalSave();
    submitForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={getFormSchema(editing)}
      onSubmit={handleSubmit}
      validateOnMount
      enableReinitialize
    >
      {formik => (
        <Form className="UserForm form-horizontal" aria-label="User Form">
          <Row>
            <Col xs={12}>
              <fieldset className="no-padding">
                <FormSectionTitle titleId="app.info" />
                <Field
                  component={RenderTextInput}
                  name="username"
                  label={<FormLabel labelId="user.username" helpId="user.username.help" required />}
                  placeholder={intl.formatMessage(msgs.username)}
                  disabled={editing}
                />
                <Field
                  component={RenderTextInput}
                  type="password"
                  name="password"
                  label={<FormLabel labelId="user.password" helpId="user.password.help" required={!editing} />}
                  placeholder={intl.formatMessage(msgs.password)}
                />
                <Field
                  component={RenderTextInput}
                  type="password"
                  name="passwordConfirm"
                  label={<FormLabel labelId="user.passwordConfirm" required={!editing} />}
                  placeholder={intl.formatMessage(msgs.passwordConfirm)}
                />
                {editing ? (
                  <div className="UserForm__content-edit" >
                    <Field
                      name="registration"
                      component={renderStaticField}
                      label={<FormattedMessage id="user.registration" />}
                    />
                    <Field
                      name="lastLogin"
                      component={renderStaticField}
                      label={<FormattedMessage id="user.lastLogin" />}
                    />
                    <Field
                      name="lastPasswordChange"
                      component={renderStaticField}
                      label={<FormattedMessage id="user.lastPasswordChange" />}
                    />
                    <Field
                      component={SwitchInput}
                      name="reset"
                      label={<FormLabel labelId="user.reset" />}
                    />
                  </div>
                ) : (
                  <Field
                    component={SelectInput}
                    name="profileType"
                    label={<FormLabel labelId="user.profileType" required />}
                    options={profileTypes}
                    defaultOptionId="form.select.chooseOne"
                  />
                )}
                <Field
                  component={SwitchInput}
                  name="status"
                  label={<FormLabel labelId="user.status" />}
                  trueValue="active"
                  falseValue="inactive"
                />
              </fieldset>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ConfirmCancelModalContainer
                contentText={intl.formatMessage({ id: 'app.confirmCancel' })}
                invalid={!formik.isValid}
                submitting={formik.isSubmitting}
                onSave={() => handleModalSave(formik)}
                onDiscard={onDiscard}
              />
              <Button
                className="pull-right"
                type="submit"
                bsStyle="primary"
                disabled={!formik.isValid || formik.isSubmitting}
                data-testid={TEST_ID_USER_FORM.SAVE_BUTTON}
                onClick={() => formik.setFieldValue('submitType', 'save')}
              >
                <FormattedMessage id="app.save" />
              </Button>
              {!editing && (
                <Button
                  className="pull-right UserForm__action-button"
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  onClick={() => formik.setFieldValue('submitType', 'saveAndEditProfile')}
                >
                  <FormattedMessage id="app.saveAndEditProfile" defaultMessage="Save and edit profile" />
                </Button>
              )}
              <Button
                className="pull-right UserForm__action-button"
                bsStyle="default"
                onClick={() => handleCancelClick(formik)}
              >
                <FormattedMessage id="app.cancel" />
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

UserForm.propTypes = {
  intl: intlShape.isRequired,
  initialValues: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    passwordConfirm: PropTypes.string,
    profileType: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    status: PropTypes.string,
    registration: PropTypes.string,
    lastLogin: PropTypes.string,
    lastPasswordChange: PropTypes.string,
    reset: PropTypes.bool,
  }),
  profileTypes: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })),
  onMount: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  onModalSave: PropTypes.func.isRequired,
  editing: PropTypes.bool,
};

UserForm.defaultProps = {
  initialValues: {
    username: '',
    password: '',
    passwordConfirm: '',
    profileType: '',
    status: 'inactive',
  },
  profileTypes: [],
  onMount: () => {},
  editing: false,
};

export default injectIntl(UserForm);
