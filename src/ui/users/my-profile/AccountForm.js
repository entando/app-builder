import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, Button, Modal } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { required, matchElement } from '@entando/utils';

import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';

const FORM_ID = 'myprofile-account';

export class AccountFormBody extends Component {
  shouldComponentUpdate(nextProps) {
    const { username } = this.props;
    if (nextProps.username === username) {
      return false;
    }
    return true;
  }

  render() {
    const { username, onEdit, onModalFormSubmit } = this.props;

    const modalTitle = (
      <Modal.Title><FormattedMessage id="user.myProfile.passwordSection" /></Modal.Title>
    );

    const modalButtons = [
      <Button
        id="savebtn"
        bsStyle="primary"
        onClick={onModalFormSubmit}
      >
        <FormattedMessage id="app.save" />
      </Button>,
    ];

    const formFields = (
      <Fragment>
        <Field
          label={<FormattedMessage id="user.myProfile.oldPassword" />}
          labelSize={4}
          component={RenderTextInput}
          name="oldPassword"
          type="password"
          validate={required}
          help="*"
        />
        <Field
          label={<FormattedMessage id="user.myProfile.newPassword" />}
          labelSize={4}
          component={RenderTextInput}
          name="newPassword"
          type="password"
          validate={required}
          help="*"
        />
        <Field
          label={<FormattedMessage id="user.myProfile.newPasswordConfirm" />}
          labelSize={4}
          component={RenderTextInput}
          name="newPasswordConfirm"
          type="password"
          validate={[required, matchElement('newPassword', 'user.myProfile.passwordMismatch')]}
          help="*"
        />
      </Fragment>
    );

    return (
      <Form
        horizontal
        className="MyProfileAccountForm"
      >
        <FormSectionTitle titleId="user.myProfile.accountSection" />
        <RenderTextInput
          label={<FormattedMessage id="user.username" />}
          input={{ value: username }}
          disabled
        />
        <RenderTextInput
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
        <GenericModalContainer
          modalId={FORM_ID}
          modalClassName="MyProfileAccountForm__modal"
          modalTitle={modalTitle}
          buttons={modalButtons}
        >
          {formFields}
        </GenericModalContainer>
      </Form>
    );
  }
}

AccountFormBody.propTypes = {
  username: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onModalFormSubmit: PropTypes.func.isRequired,
};

const AccountForm = reduxForm({
  form: FORM_ID,
})(AccountFormBody);

AccountForm.FORM_ID = FORM_ID;

export default AccountForm;
