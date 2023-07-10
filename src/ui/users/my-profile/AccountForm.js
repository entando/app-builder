import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Modal } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { required } from '@entando/utils';
import { Field, withFormik, useFormikContext } from 'formik';
import RenderTextInput from 'ui/common/formik-field/RenderTextInput';
import RenderReduxFormTextInput from 'ui/common/form/RenderTextInput';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';

const FORM_ID = 'myprofile-account';

export const PasswordFormBody = () => (
  // eslint-disable-next-line jsx-a11y/no-redundant-roles
  <form role="form" horizontal className="MyProfileAccountForm" >
    <Field
      label={<FormattedMessage id="user.myProfile.oldPassword" />}
      labelSize={4}
      component={RenderTextInput}
      name="oldPassword"
      data-testid="oldPassword"
      type="password"
      help="*"
    />
    <Field
      label={<FormattedMessage id="user.myProfile.newPassword" />}
      labelSize={4}
      component={RenderTextInput}
      name="newPassword"
      data-testid="newPassword"
      type="password"
      help="*"
    />
    <Field
      label={<FormattedMessage id="user.myProfile.newPasswordConfirm" />}
      labelSize={4}
      component={RenderTextInput}
      name="newPasswordConfirm"
      data-testid="newPasswordConfirm"
      type="password"
      help="*"
    />
  </form>
);


export const PasswordChangeFormModal = () => {
  const formikContext = useFormikContext() || {};

  const modalTitle = (
    <Modal.Title><FormattedMessage id="user.myProfile.passwordSection" /></Modal.Title>
  );

  const modalButtons = [
    <Button
      id="savebtn"
      bsStyle="primary"
      type="submit"
      loading={formikContext.isSubmitting}
      disabled={formikContext.isSubmitting || !formikContext.isValid}
      onClick={
      () => formikContext.submitForm()
    }
    >
      <FormattedMessage id="app.save" />
    </Button>,
  ];
  return (
    <GenericModalContainer
      modalId={FORM_ID}
      modalClassName="MyProfileAccountForm__modal"
      modalTitle={modalTitle}
      buttons={modalButtons}
      modalCloseCleanup={() => formikContext.resetForm()}
    >
      <PasswordFormBody />
    </GenericModalContainer>
  );
};

const ModalFormContainer = withFormik({

  mapPropsToValues: () => ({
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  }),
  validate: (values) => {
    const errors = {};
    if (required(values.oldPassword)) {
      errors.oldPassword = <FormattedMessage id="validateForm.required" />;
    }
    if (required(values.newPassword)) {
      errors.newPassword = <FormattedMessage id="validateForm.required" />;
    }
    if (values.newPassword !== values.newPasswordConfirm) {
      errors.newPasswordConfirm = <FormattedMessage id="user.myProfile.passwordMismatch" />;
    }
    return errors;
  },
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    const { onSubmit } = props;
    onSubmit(values).then(() => {
      resetForm();
      setSubmitting(false);
    }).catch(() => {
      setSubmitting(false);
    });
  },
  displayName: 'AccountFormPasswordChangeModalForm', // helps with React DevTools
})(PasswordChangeFormModal);

export function AccountFormBody(props) {
  const { username, onEdit } = props;

  return (
    <Form horizontal className="MyProfileAccountForm">
      <FormSectionTitle titleId="user.myProfile.accountSection" />
      <RenderReduxFormTextInput
        label={<FormattedMessage id="user.username" />}
        input={{ value: username }}
        disabled
      />
      <RenderReduxFormTextInput
        label={<FormattedMessage id="user.password" />}
          // Display fake password value
        input={{ value: '**********' }}
        type="password"
        help="*"
        disabled
      />
      <Button className="pull-right" bsStyle="primary" onClick={onEdit}>
        <FormattedMessage id="user.myProfile.passwordSection" />
      </Button>
      <ModalFormContainer {...props} />
    </Form>
  );
}

AccountFormBody.propTypes = {
  username: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onModalFormSubmit: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const AccountForm = AccountFormBody;

AccountForm.FORM_ID = FORM_ID;

export default AccountForm;
