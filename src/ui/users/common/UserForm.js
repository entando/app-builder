import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col, FormGroup } from 'patternfly-react';
import {
  required,
  maxLength,
  minLength,
  matchPassword,
  userFormText,
  formatDate,
} from '@entando/utils';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';
import FormSectionTitle from 'ui/common/form/FormSectionTitle';

const EDIT_MODE = 'edit';
const NEW_MODE = 'new';

const minLength4 = minLength(4);
const minLength8 = minLength(8);
const maxLength20 = maxLength(20);

export const renderStaticField = (field) => {
  const { input, label, name } = field;
  let fieldValue = input.value.title || input.value;
  if (!input.value) {
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

const msgs = defineMessages({
  username: {
    id: 'user.table.username',
    defaultMessage: 'Username',
  },
  password: {
    id: 'user.password',
    defaultMessage: 'Password',
  },
  passwordConfirm: {
    id: 'user.passwordConfirm',
    defaultMessage: 'Confirm Password',
  },
});

export class UserFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const {
      intl, onSubmit, handleSubmit, invalid, submitting, mode, profileTypes,
    } = this.props;

    const showUsername = (
      <Field
        component={RenderTextInput}
        name="username"
        label={<FormLabel labelId="user.table.username" helpId="user.username.help" required />}
        placeholder={intl.formatMessage(msgs.username)}
        validate={mode !== EDIT_MODE ?
          [required, minLength4, maxLength20, userFormText] : undefined}
        disabled={mode === EDIT_MODE}
      />
    );
    const showEdit = () => {
      if (mode === NEW_MODE) {
        return null;
      }
      return (
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
          <FormGroup>
            <label htmlFor="reset" className="col-xs-2 control-label">
              <FormattedMessage id="user.reset" />&nbsp;
            </label>
            <Col xs={4}>
              <Field
                component={SwitchRenderer}
                name="reset"
              />
            </Col>
          </FormGroup>
        </div>
      );
    };

    const showProfileType = (
      mode !== EDIT_MODE ?
        (<Field
          component={RenderSelectInput}
          options={profileTypes}
          defaultOptionId="form.select.chooseOne"
          label={<FormLabel labelId="user.profileType" required />}
          name="profileType"
          validate={required}
        />) : null
    );

    return (
      <form onSubmit={handleSubmit(onSubmit.bind(this))} className="UserForm form-horizontal">
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <FormSectionTitle titleId="app.info" />
              {showUsername}
              <Field
                component={RenderTextInput}
                name="password"
                type="password"
                label={<FormLabel labelId="user.password" helpId="user.password.help" required={mode === NEW_MODE} />}
                placeholder={intl.formatMessage(msgs.password)}
                validate={[required, minLength8, maxLength20, userFormText]}
              />
              <Field
                component={RenderTextInput}
                name="passwordConfirm"
                type="password"
                label={<FormLabel labelId="user.passwordConfirm" required={mode === NEW_MODE} />}
                placeholder={intl.formatMessage(msgs.passwordConfirm)}
                validate={[required, matchPassword]}
              />
              {/* Insert user info and reset button on EDIT */}
              {showEdit()}
              {showProfileType}
              <FormGroup>
                <label htmlFor="status" className="col-xs-2 control-label">
                  <FormattedMessage id="user.status" />&nbsp;
                </label>
                <Col xs={4}>
                  <Field
                    component={SwitchRenderer}
                    name="status"
                    trueValue="active"
                    falseValue="inactive"
                  />
                </Col>
              </FormGroup>
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
            {
              mode !== EDIT_MODE && (
                <Button
                  className="pull-right"
                  disabled={invalid || submitting}
                  onClick={handleSubmit(values => onSubmit({
                  ...values,
                  saveType: 'editProfile',
                }))}
                >
                  <FormattedMessage id="app.saveAndEditProfile" defaultMessage="Save and edit profile" />
                </Button>
              )
            }
          </Col>
        </Row>
      </form>
    );
  }
}

UserFormBody.propTypes = {
  intl: intlShape.isRequired,
  onWillMount: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  mode: PropTypes.string,
  profileTypes: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    text: PropTypes.string,
  })),
};

UserFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  mode: NEW_MODE,
  onWillMount: null,
  profileTypes: [],
};

const UserForm = reduxForm({
  form: 'user',
})(UserFormBody);

export default injectIntl(UserForm);
