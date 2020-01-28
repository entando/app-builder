import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { required, matchElement } from '@entando/utils';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';

export class PasswordFormBody extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { username } = this.props;
    if (nextProps.username === username) {
      return false;
    }
    return true;
  }

  submit(data) {
    this.props.onSubmit(this.props.username, data);
  }

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.submit)} horizontal className="MyProfilePasswordForm">
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
  }
}

PasswordFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default reduxForm({
  form: 'myprofile-password',
})(PasswordFormBody);
