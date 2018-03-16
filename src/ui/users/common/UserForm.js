import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Row, Col, FormGroup } from 'patternfly-react';
import { formattedText } from 'frontend-common-components';
import { FormattedMessage } from 'react-intl';
import { required, maxLength, minLength, matchPassword, userFormText } from 'util/validateForm';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import RenderSelectInput from 'ui/common/form/RenderSelectInput';
import FormLabel from 'ui/common/form/FormLabel';

const EDIT_MODE = 'edit';
const NEW_MODE = 'new';

export class UserFormBody extends Component {
  componentWillMount() {
    this.props.onWillMount(this.props);
  }

  render() {
    const {
      onSubmit, handleSubmit, invalid, submitting, mode, profileTypes,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(onSubmit.bind(this))} className="UserForm form-horizontal">
        <Row>
          <Col xs={12}>
            <fieldset className="no-padding">
              <legend>
                <FormattedMessage id="app.info" />
                <div className="UserForm__required-fields text-right">
                  * <FormattedMessage id="app.fieldsRequired" />
                </div>
              </legend>
              <Field
                component={RenderTextInput}
                name="username"
                label={<FormLabel labelId="user.table.username" helpId="user.username.help" required />}
                placeholder={formattedText('user.table.username')}
                validate={[required, minLength(8), maxLength(20), userFormText]}
                disabled={mode === EDIT_MODE}

              />
              <Field
                component={RenderTextInput}
                name="password"
                type="password"
                label={<FormLabel labelId="user.password" helpId="user.password.help" required />}
                placeholder={formattedText('user.password')}
                validate={[required, minLength(8), maxLength(20), userFormText]}
              />
              <Field
                component={RenderTextInput}
                name="passwordConfirm"
                type="password"
                label={<FormLabel labelId="user.passwordConfirm" required />}
                placeholder={formattedText('user.passwordConfirm')}
                validate={[required, matchPassword]}
              />
              {/* Insert user info and reset button on EDIT */}
              <RenderSelectInput
                options={profileTypes}
                defaultOptionId="form.select.chooseOne"
                labelId="user.profileType"
                fieldName="profileType"
              />
              <FormGroup>
                <label htmlFor="status" className="col-xs-2 control-label">
                  <FormattedMessage id="user.status" />&nbsp;
                </label>
                <Col xs={4}>
                  <Field
                    component={SwitchRenderer}
                    name="status"
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
          </Col>
        </Row>
      </form>
    );
  }
}

UserFormBody.propTypes = {
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

export default UserForm;
