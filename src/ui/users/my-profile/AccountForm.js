import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Modal } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { required, matchElement } from '@entando/utils';
import { Formik, Field } from 'formik';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import GenericModalContainer from 'ui/common/modal/GenericModalContainer';

const FORM_ID = 'myprofile-account';

export class AccountFormBody extends Component {
  shouldComponentUpdate(nextProps) {
    const { username, locale } = this.props;
    if (nextProps.username === username && nextProps.locale === locale) {
      return false;
    }
    return true;
  }

  onSubmit = (values) => {
    const { onModalFormSubmit } = this.props;
    onModalFormSubmit(values);
  };

  render() {
    const { username, onEdit,  } = this.props;

    const modalTitle = (
      <Modal.Title><FormattedMessage id="user.myProfile.passwordSection" /></Modal.Title>
    );

    const modalButtons = [
      <Button id="savebtn" bsStyle="primary" type="submit">
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
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          newPasswordConfirm: '',
        }}
        onSubmit={this.onSubmit}
      >
        {({ handleSubmit }) => (
          <Form horizontal  className="MyProfileAccountForm" onSubmit={handleSubmit} >
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
              // modalCloseCleanup={onModalClose}
            >
              {formFields}
            </GenericModalContainer>
          </Form>
        )}
      </Formik>
    );
  }
}

AccountFormBody.propTypes = {
  username: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onModalFormSubmit: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  //onModalClose: PropTypes.func.isRequired,
};

const AccountForm = AccountFormBody;

AccountForm.FORM_ID = FORM_ID;

export default AccountForm;