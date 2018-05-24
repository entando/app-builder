import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { required, matchElement } from '@entando/utils';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';

export const PasswordFormBody = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit} horizontal className="MyProfilePasswordForm">
    <FormSectionTitle titleId="user.myProfile.passwordSection" />
    <Field
      label={<FormattedMessage id="user.myProfile.oldPassword" />}
      component={RenderTextInput}
      name="oldPassword"
      type="password"
      validate={required}
      help="*"
    />
    <Field
      label={<FormattedMessage id="user.myProfile.newPassword" />}
      component={RenderTextInput}
      name="newPassword"
      type="password"
      validate={required}
      help="*"
    />
    <Field
      label={<FormattedMessage id="user.myProfile.newPasswordConfirm" />}
      component={RenderTextInput}
      name="newPasswordConfirm"
      type="password"
      validate={[required, matchElement('newPassword', 'user.myProfile.passwordMismatch')]}
      help="*"
    />
    <Button
      className="pull-right"
      type="submit"
      bsStyle="primary"
    >
      <FormattedMessage id="app.save" />
    </Button>
  </Form>
);

PasswordFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'myprofile-password',
})(PasswordFormBody);
